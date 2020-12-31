using CarDetection.Generics;
using CarDetection.Interfaces;
using Domain.Entities;
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
        private readonly string BaseUrl = "http://212.117.25.59:5000/predict";

        private const int SleepWhenOffline = 30000;

        private readonly IHttpClientFactory httpClientFactory;

        private readonly LimitedSize<ModelResponse> Predictions;
        private readonly CIDMDbContext context;

        private int MaxCount { get; set; }

        private int CurrentCount { get; set; }

        public bool Working { get; set; }

        private readonly object _lock;

        public MRCnnResponse LastPrediction { get; set; }

        private HashSet<Rect>? SelectedRects { get; set; }

        public MRCnnModel(IHttpClientFactory httpClientFactory, CIDMDbContext context)
        {
            _lock = new object();
            this.httpClientFactory = httpClientFactory;
            LastPrediction = new MRCnnResponse();
            Predictions = new LimitedSize<ModelResponse>(10);
            this.context = context;
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
                List<Rect> positions = await AllSelected();
                if (positions.Count == 0)
                {
                    LastPrediction.Free = 0;
                    LastPrediction.Total = 0;
                    LastPrediction.Rects = new List<DrawRects>();
                    return;
                }
                var client = httpClientFactory.CreateClient();
                var url = BuildUrl(positions);
                var response = await client.GetAsync(url);
                if (!response.IsSuccessStatusCode)
                {
                    LastPrediction.Online = false;
                    await Task.Delay(SleepWhenOffline);
                    return;
                }
                else
                {
                    LastPrediction.Online = true;
                }
                var content = await response.Content.ReadAsStringAsync();

                var model = JsonConvert.DeserializeObject<ModelResponse>(content);
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
                LastPrediction.ParseRects(model.Rects);
            }
            catch (Exception) 
            {
                LastPrediction.Online = false;
                await Task.Delay(SleepWhenOffline);
            }
            finally
            {
                Working = false;
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
            var url = "http%3A%2F%2F118.220.7.47%3A8000%2Fwebcapture.jpg%3Fcommand%3Dsnap%26channel%3D1%3F1609097577";

            return $"{BaseUrl}?url={url}&pos={pos}";
        }

        public async Task<List<Rect>> AllSelected()
        {
            if (SelectedRects == null)
            {
                SelectedRects = new HashSet<Rect>(await this.context.Rects
                .ToListAsync());
            }

            return SelectedRects.ToList();
        }

        public async Task<bool> Selected(List<Rect> selected)
        {
            SelectedRects = new HashSet<Rect>(selected);

            var current = await this.context.Rects
                .ToListAsync();

            this.context.RemoveRange(current);

            this.context.Rects.AddRange(SelectedRects.ToList());
            await this.context.SaveChangesAsync();
            return true;
        }
    }

    public class PredictionDto
    {
        public int Detected { get; set; }
    }

    public class MRCnnResponse
    {
        public int Total { get; set; }

        public int Free { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public bool Online { get; set; }

        public List<DrawRects> Rects { get; set; } = new List<DrawRects>();

        public List<double> Detected { get; set; } = new List<double>();
        public List<DrawRects> Result { get; set; } = new List<DrawRects>();

        public void ParseRects(List<List<string>> data)
        {
            Rects.Clear();
            foreach (var rect in data)
            {
                Rects.Add(new DrawRects(rect));
            }
        }
    }

    public class ModelResponse
    {
        [JsonProperty("data")]
        public List<List<string>> Data { get; set; } = new List<List<string>>();
        [JsonProperty("rects")]
        public List<List<string>> Rects { get; set; } = new List<List<string>>();
        [JsonProperty("url")]
        public string Url { get; set; } = string.Empty;
        [JsonProperty("height")]
        public int Height { get; set; }
        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("detected")]
        public List<double> Detected { get; set; } = new List<double>();
    }

    public class DrawRects
    {
        public int x { get; set; }

        public int y { get; set; }

        public int width { get; set; }

        public int height { get; set; }

        public DrawRects(int x1, int y1, int x2, int y2)
        {
            x = x1;
            y = y1;

            width = x2 - x1;
            height = y2 - y1;
        }

        public DrawRects(List<string> data)
        {
            var parsed = data.Select(x => int.Parse(x))
                .ToList();

            var y1 = parsed[0];
            var x1 = parsed[1];
            var y2 = parsed[2];
            var x2 = parsed[3];

            x = x1;
            y = y1;

            width = x2 - x1;
            height = y2 - y1;
        }
    }
}
