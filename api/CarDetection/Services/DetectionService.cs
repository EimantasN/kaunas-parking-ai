using CarDetection.Interfaces;
using CarDetection.Models;
using System;
using System.Threading.Tasks;

namespace CarDetection.Services
{
    public class DetectionService : IDetection
    {
        public Task<AnalyzeObject> Detect(byte[] data)
        {
            var totalCount = new Random(Guid.NewGuid().GetHashCode()).Next(5, 15);
            return Task.FromResult(new AnalyzeObject(data,
                totalCount,
                new Random(Guid.NewGuid().GetHashCode()).Next(0, totalCount)
            ));
        }
    }
}
