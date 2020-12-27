using CarDetection.Generics;
using CarDetection.Interfaces;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace CarDetection.MLModels
{
    public class MRCnnModel : IMRCnnModel
    {
        private readonly string BaseUrl = "http://192.168.0.107:5000/";

        private readonly IHttpClientFactory httpClientFactory;

        private readonly LimitedSize<ModelResponse> Predictions;

        private int MaxCount { get; set; }

        private int CurrentCount { get; set; }

        public bool Working { get; set; }

        private readonly object _lock;

        public MRCnnResponse LastPrediction { get; set; }

        public MRCnnModel(IHttpClientFactory httpClientFactory)
        {
            _lock = new object();
            this.httpClientFactory = httpClientFactory;
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

            var url = "http%3A%2F%2F118.220.7.47%3A8000%2Fwebcapture.jpg%3Fcommand%3Dsnap%26channel%3D1%3F1609097577";

            try
            {
                var client = httpClientFactory.CreateClient();
                var response = await client.GetAsync(BaseUrl);
                var content = await response.Content.ReadAsStringAsync();

                var model = JsonConvert.DeserializeObject<ModelResponse>(content);
                var carDetections = model.Data
                    .Where(x => x[1] == "car")
                    .ToList();

                // Save to history
                Predictions.Add(model);

                // Total count
                CurrentCount = carDetections.Count;
                if (CurrentCount > MaxCount)
                    MaxCount = CurrentCount;

                // Format newest data

                LastPrediction.Free = MaxCount - CurrentCount;
                LastPrediction.Total = MaxCount;

                LastPrediction.Width = model.Width;
                LastPrediction.Height = model.Height;
                LastPrediction.ParseRects(model.Rects);
            }
            finally
            {
                Working = false;
            }
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

        public List<DrawRects> Rects { get; set; } = new List<DrawRects>();

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
    }

    public class DrawRects
    {
        public int x { get; set; }

        public int y { get; set; }

        public int width { get; set; }

        public int height { get; set; }

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
