using CarDetection.Interfaces;
using CarDetection.Models;
using Domain.Entities;
using Domain.Exeptions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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


        private readonly IHttpClientFactory httpClientFactory;
        private readonly IModelControls controls;

        public Dictionary<int, MRCnnResponse> LastPredictions { get; set; }

        private Stopwatch Timer { get; set; }

        private List<StreamSource> Sources { get; set; }

        public MRCnnModel(IHttpClientFactory httpClientFactory, IModelControls controls)
        {
            Timer = new Stopwatch();
            this.httpClientFactory = httpClientFactory;
            this.controls = controls;
            LastPredictions = new Dictionary<int, MRCnnResponse>();
        }

        public MRCnnResponse GetLastPrediction(int source)
        {
            if (LastPredictions.ContainsKey(source))
            {
                return LastPredictions[source];
            }
            return LastPredictions[source] = new MRCnnResponse();
        }

        public async Task Predict()
        {
            if (Sources == null)
            {
                Sources = await controls.GetSources();
            }

            foreach (var source in Sources)
            {
                await PredictBySource(GetLastPrediction(source.Id), source);
            }
        }

        private async Task PredictBySource(MRCnnResponse lastPrediction, StreamSource streamSource)
        {
            try
            {
                lastPrediction.Working = true;

                Timer.Restart();
                List<Rect> positions = await controls.AllSelected(streamSource.Id);
                var currentSourceId = streamSource.Id;
                var activeUrl = Enviroment.SourceImageRemote(streamSource);

                if (positions.Count == 0)
                {
                    lastPrediction.Free = 0;
                    lastPrediction.Total = 0;
                    lastPrediction.Rects = new List<DrawRects>();
                    return;
                }
                var model = await SendRequest(lastPrediction, positions, activeUrl);

                var carDetections = model.Data
                    .Where(x => x[1] == "car")
                    .ToList();

                // Save to history
                lastPrediction.AddPrediction(model);

                lastPrediction.Result = positions
                    .Select(x => new DrawRects(x.x1, x.y1, x.x2, x.y2))
                    .ToList();

                lastPrediction.Detected = model.Detected;

                // Format newest data
                lastPrediction.Total = positions.Count;
                lastPrediction.Free = model.Detected
                    .Where(x => x < 0.4)
                    .Count();

                lastPrediction.Width = model.Width;
                lastPrediction.Height = model.Height;
                lastPrediction.SourceId = currentSourceId;
                lastPrediction.Miliseconds = (int)Timer.ElapsedMilliseconds;
                lastPrediction.Online = true;
                lastPrediction.ParseRects(model.Rects);
            }
            catch (Exception e)
            {
                lastPrediction.Online = false;
            }
            finally
            {
                lastPrediction.Working = false;
            }
        }

        public async Task<ModelResponse> SendRequest(MRCnnResponse lastPrediction, List<Rect> positions, string activeUrl)
        {
            var client = httpClientFactory.CreateClient();
            var url = BuildUrl(positions, activeUrl);
            var response = await client.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                lastPrediction.Online = false;
                throw new ModelUnreachable();
            }
            else
            {
                lastPrediction.Online = true;
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

        private string BuildUrl(List<Rect> positions, string activeUrl)
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
            var url = WebUtility.UrlEncode(activeUrl);

            return $"{BaseUrl}?url={url}&pos={pos}";
        }
    }
}
