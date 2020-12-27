using CarDetection.Interfaces;
using Domain.Entities;
using System.Collections.Generic;

namespace CarDetection.Services
{
    public class ModelService : IModelService
    {
        private readonly List<MlModel> models;

        public ModelService()
        {
            models = new List<MlModel>()
            {
                new MlModel()
                {
                    Id = 1,
                    Path = "",
                    Name ="Mask RCNN",
                    Stream = new StreamSource()
                    {
                        Increment = 1,
                        Miliseconds = 3000,
                        Refresh = true,
                        Current = 1609073784,
                        Url = "http://80.34.181.34:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1&1609073784"
                    }
                }
            };
        }

        public List<MlModel> GetModels()
        {
            return models;
        }
    }
}
