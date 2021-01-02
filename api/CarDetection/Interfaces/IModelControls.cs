using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarDetection.Interfaces
{
    public interface IModelControls
    {
        Task<List<Rect>> AllSelected();

        Task<bool> Selected(List<Rect> selected);
    }
}
