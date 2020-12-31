using CarDetection.Interfaces;
using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;

namespace CarDetection.HostedServices
{
    public class MRCnnHostedService : BackgroundService
    {
        private readonly IMRCnnModel mrcnn;

        public MRCnnHostedService(IMRCnnModel mrcnn)
        {
            this.mrcnn = mrcnn;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (true)
            {
                await mrcnn.Predict();
            }
        }
    }
}
