using CarDetection.Interfaces;
using CarDetection.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarDetection.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MRCnnController : ControllerBase
    {
        private readonly IMRCnnModel mrcnn;

        public MRCnnController(IMRCnnModel mrcnn)
        {
            this.mrcnn = mrcnn;
        }

        [HttpGet("/Predict/source")]

        public ActionResult<MRCnnResponse> Predict(int source)
        {
            return mrcnn.GetLastPrediction(source);
        }
    }
}
