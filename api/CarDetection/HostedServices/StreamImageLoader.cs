using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace CarDetection.HostedServices
{
    public class StreamImageLoader : BackgroundService
    {
        private readonly CIDMDbContext context;
        private readonly IHttpClientFactory http;

        private readonly string PathRoot;

        private List<StreamSource> StreamSources;

        public StreamImageLoader(
            CIDMDbContext context,
            IHttpClientFactory http, 
            IHostEnvironment environment)
        {
            StreamSources = new List<StreamSource>();
            this.context = context;
            this.http = http;

            if (environment.IsDevelopment())
            {
                PathRoot = @"C:\Users\Eimantas\Desktop\Images";
            }
            else
            {
                PathRoot = @"/var/www/KaunasParkingAI/UI/tmp_clone/kaunas-parking-ai/build";
            }
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            StreamSources = await context.Sources
                .ToListAsync();

            Stopwatch sw = new Stopwatch();

            while (!stoppingToken.IsCancellationRequested)
            {
                sw.Restart();
                var tasks = StreamSources
                    .Select(ss => LoadImage(ss));

                await Task.WhenAll(tasks);

                if (sw.ElapsedMilliseconds < 1000)
                {
                    int sleep = 1000 - (int)sw.ElapsedMilliseconds + 100;
                    await Task.Delay(sleep);
                }
            }
        }

        private async Task<bool> LoadImage(StreamSource source)
        {
            try
            {
                string path = $"{PathRoot}{Path.DirectorySeparatorChar}{source.Id}.png";
                using (var client = http.CreateClient())
                {
                    var image = await client.GetByteArrayAsync(source.Url);
                    using (var ms = new MemoryStream(image))
                    {
                        using (var fs = new FileStream(path, FileMode.Create))
                        {
                            ms.WriteTo(fs);
                        }
                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
