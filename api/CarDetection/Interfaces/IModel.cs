using System.Threading.Tasks;

namespace CarDetection.Interfaces
{
    public interface IModel
    {
        Task Predict();
    }
}
