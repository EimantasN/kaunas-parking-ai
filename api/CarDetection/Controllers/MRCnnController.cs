using CarDetection.Interfaces;
using CarDetection.MLModels;
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

        [HttpGet("/Predict")]

        public ActionResult<MRCnnResponse> Predict()
        {
            return mrcnn.LastPrediction;
        }
    }
}
