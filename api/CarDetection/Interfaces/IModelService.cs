using Domain.Entities;
using System.Collections.Generic;

namespace CarDetection.Interfaces
{
    public interface IModelService
    {
        List<MlModel> GetModels();
    }
}
