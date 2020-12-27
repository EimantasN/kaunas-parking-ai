using CarDetection.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CarDetection.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelsController : ControllerBase
    {
        private readonly IModelService modelService;

        public ModelsController(IModelService modelService)
        {
            this.modelService = modelService;
        }

        [HttpGet("/All")]

        public ActionResult<List<MlModel>> All()
        {
            return modelService.GetModels();
        }
    }
}
