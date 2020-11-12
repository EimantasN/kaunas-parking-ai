using System.Collections.Generic;

namespace CarDetection.Models
{
    public class AnalyzeObject
    {
        public byte[] Data { get; set; }

        public int TotalCount { get; set; }

        public int Detected { get; set; }

        public List<Match> Matches { get; private set; } = new List<Match>();

        public AnalyzeObject() { }

        public AnalyzeObject(byte[] data, int count, int detected)
        {
            Data = data;
            TotalCount = count;
            Detected = detected;

            for (int i = 0; i < TotalCount; i++)
            {
                Matches.Add(Match.Random());
            }
        }
    }
}
