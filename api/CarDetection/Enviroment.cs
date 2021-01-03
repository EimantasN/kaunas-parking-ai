using Domain.Entities;
using Microsoft.Extensions.Hosting;
using System.IO;

namespace CarDetection
{
    public static class Enviroment
    {
        private static IHostEnvironment host { get; set; }

        public static string ImageRootPath { get; set; } = "C:";

        public static string SourceImageRemote(StreamSource source)
        {
            return $"http://p170m109.endev.lt/{source.Id}.png";
        }

        public static string SourceImage(StreamSource source)
        {
            return $"{Enviroment.ImageRootPath}{Path.DirectorySeparatorChar}{source.Id}.png";
        }

        public static void Setup(IHostEnvironment host)
        {
            Enviroment.host = host;
            if (host.IsDevelopment())
            {
                ImageRootPath = @"C:\Users\Eimantas\Desktop\Images";
            }
            else
            {
                ImageRootPath = @"/var/www/KaunasParkingAI/UI/tmp_clone/kaunas-parking-ai/build";
            }
        }
    }
}
