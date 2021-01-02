using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarDetection.Interfaces
{
    public interface IModelControls
    {
        Task<bool> SetActive(int source);

        Task<List<StreamSource>> GetSources();

        Task<List<Rect>> AllSelected(int source);

        Task<List<Rect>> ActiveAllSelected();

        Task<bool> Selected(List<Rect> selected, int source);
    }
}
