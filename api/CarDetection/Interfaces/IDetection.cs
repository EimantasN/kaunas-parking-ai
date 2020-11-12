using CarDetection.Models;
using System.Threading.Tasks;

namespace CarDetection.Interfaces
{
    public interface IDetection
    {
        Task<AnalyzeObject> Detect(byte[] data);
    }
}
