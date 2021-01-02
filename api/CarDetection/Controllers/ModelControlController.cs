using CarDetection.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarDetection.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModelControlController : ControllerBase
    {
        private readonly IModelControls controls;

        public ModelControlController(IModelControls controls)
        {
            this.controls = controls;
        }

        [HttpGet("/AllSelected")]

        public async Task<ActionResult<List<Rect>>> AllSelected()
        {
            return await controls.AllSelected();
        }

        [HttpPost("/Selected")]
        public async Task<ActionResult<bool>> Selected([FromBody] List<Rect> selected)
        {
            return await controls.Selected(selected);
        }
    }
}
