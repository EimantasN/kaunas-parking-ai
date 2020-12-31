using CarDetection.MLModels;
using Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarDetection.Interfaces
{
    public interface IMRCnnModel : IModel
    {
        MRCnnResponse LastPrediction { get; }

        Task<List<Rect>> AllSelected();

        Task<bool> Selected(List<Rect> selected);
    }
}
