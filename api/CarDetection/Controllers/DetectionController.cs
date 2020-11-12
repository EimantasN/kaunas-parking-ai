using CarDetection.Interfaces;
using CarDetection.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CarDetection.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DetectionController : ControllerBase
    {
        private readonly IDetection detection;

        public DetectionController(IDetection detection)
        {
            this.detection = detection;
        }

        // TODO: Pass data from file or ....
        [HttpPost("/Detect")]
        public async Task<ActionResult<AnalyzeObject>> Detect()
        {
            return await detection.Detect(null);
        }
    }
}
