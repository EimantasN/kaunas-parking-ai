using CarDetection.Generics;
using CarDetection.Interfaces;
using CarDetection.Models;
using Domain.Entities;
using Domain.Exeptions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CarDetection.MLModels
{
    public class MRCnnModel : IMRCnnModel
    {
        private readonly string BaseUrl = "http://192.168.0.107:5000/predict";

        private const int SleepWhenOffline = 30000;

        private readonly IHttpClientFactory httpClientFactory;
        private readonly IModelControls controls;

        private readonly LimitedSize<ModelResponse> Predictions;

        private int MaxCount { get; set; }

        private int CurrentCount { get; set; }

        public bool Working { get; set; }

        private readonly object _lock;

        public MRCnnResponse LastPrediction { get; set; }

        public MRCnnModel(IHttpClientFactory httpClientFactory, IModelControls controls)
        {
            _lock = new object();
            this.httpClientFactory = httpClientFactory;
            this.controls = controls;
            LastPrediction = new MRCnnResponse();
            Predictions = new LimitedSize<ModelResponse>(10);
        }

        public async Task Predict()
        {
            lock (_lock)
            {
                if (Working)
                    return;
                Working = true;
            }

            try
            {
                List<Rect> positions = await controls.ActiveAllSelected();
                if (positions.Count == 0)
                {
                    LastPrediction.Free = 0;
                    LastPrediction.Total = 0;
                    LastPrediction.Rects = new List<DrawRects>();
                    return;
                }
                var model = await SendRequest(positions);

                var carDetections = model.Data
                    .Where(x => x[1] == "car")
                    .ToList();

                // Save to history
                Predictions.Add(model);

                LastPrediction.Result = positions
                    .Select(x => new DrawRects(x.x1, x.y1, x.x2, x.y2))
                    .ToList();

                LastPrediction.Detected = model.Detected;

                // Total count
                CurrentCount = carDetections.Count;
                if (CurrentCount > MaxCount)
                    MaxCount = CurrentCount;

                // Format newest data

                LastPrediction.Total = positions.Count;
                LastPrediction.Free = model.Detected
                    .Where(x => x < 0.4)
                    .Count();

                LastPrediction.Width = model.Width;
                LastPrediction.Height = model.Height;
                LastPrediction.SourceId = controls.Source.Id;
                LastPrediction.ParseRects(model.Rects);
            }
            catch (Exception e) 
            {
                LastPrediction.Online = false;
                await Task.Delay(SleepWhenOffline);
            }
            finally
            {
                Working = false;
            }
        }

        public async Task<ModelResponse> SendRequest(List<Rect> positions)
        {
            var client = httpClientFactory.CreateClient();
            var url = BuildUrl(positions);
            var response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                LastPrediction.Online = false;
                await Task.Delay(SleepWhenOffline);
                throw new ModelUnreachable();
            }
            else
            {
                LastPrediction.Online = true;
            }
            var content = await response.Content.ReadAsStringAsync();
            try
            {
                return JsonConvert.DeserializeObject<ModelResponse>(content);
            }
            catch
            {
                throw new InvalidModelResponse();
            }
        }

        private string BuildUrl(List<Rect> positions)
        {
            var stringBuilder = new StringBuilder();
            positions.ForEach((x) =>
            {
                stringBuilder.Append(x.y1);
                stringBuilder.Append(",");
                stringBuilder.Append(x.x1);
                stringBuilder.Append(",");
                stringBuilder.Append(x.y2);
                stringBuilder.Append(",");
                stringBuilder.Append(x.x2);
                stringBuilder.Append(",");
            });
            stringBuilder.Remove(stringBuilder.Length - 1, 1);
            var pos = WebUtility.UrlEncode(stringBuilder.ToString());
            var url = WebUtility.UrlEncode(controls.Source.Url);

            return $"{BaseUrl}?url={url}&pos={pos}";
        }
    }
}
