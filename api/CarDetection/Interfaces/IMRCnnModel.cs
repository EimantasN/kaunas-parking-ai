using CarDetection.Models;

namespace CarDetection.Interfaces
{
    public interface IMRCnnModel : IModel
    {
        MRCnnResponse LastPrediction { get; }
    }
}
