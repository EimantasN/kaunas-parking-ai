using CarDetection.MLModels;
using System.Collections.Generic;

namespace CarDetection.Models
{
    public class MRCnnResponse
    {
        public int Total { get; set; }

        public int Free { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public bool Online { get; set; }

        public int SourceId { get; set; }

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
}
