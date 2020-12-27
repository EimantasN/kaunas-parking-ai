using CarDetection.MLModels;

namespace CarDetection.Interfaces
{
    public interface IMRCnnModel : IModel
    {
        MRCnnResponse LastPrediction { get; }
    }
}
