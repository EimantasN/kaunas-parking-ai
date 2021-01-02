using Newtonsoft.Json;
using System.Collections.Generic;

namespace CarDetection.Models
{
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
}
