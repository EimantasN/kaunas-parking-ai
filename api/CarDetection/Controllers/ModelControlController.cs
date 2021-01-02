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

        [HttpGet("/Sources")]

        public async Task<ActionResult<List<StreamSource>>> Sources()
        {
            return await controls.GetSources();
        }

        [HttpGet("/AllSelected/source")]

        public async Task<ActionResult<List<Rect>>> AllSelected(int source)
        {
            return await controls.AllSelected(source);
        }

        [HttpPost("/Selected")]
        public async Task<ActionResult<bool>> Selected([FromBody] List<Rect> selected, int source)
        {
            return await controls.Selected(selected, source);
        }
    }
}
