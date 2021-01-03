using CarDetection.Models;

namespace CarDetection.Interfaces
{
    public interface IMRCnnModel : IModel
    {
        MRCnnResponse GetLastPrediction(int source);
    }
}
