using CarDetection.Interfaces;
using CarDetection.MLModels;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

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

        [HttpGet("/AllSelected")]

        public async Task<ActionResult<List<Rect>>> AllSelected()
        {
            return await mrcnn.AllSelected();
        }

        [HttpPost("/Selected")]
        public async Task<ActionResult<bool>> Selected([FromBody] List<Rect> selected)
        {
            return await mrcnn.Selected(selected);
        }
    }
}
