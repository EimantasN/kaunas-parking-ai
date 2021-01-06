using System;
using System.Net;
using System.Threading.Tasks;

namespace StreamTesting
{
    class Program
    {
        static async Task Main(string[] args)
        {
            var stream = "http://162.17.65.121/mjpg/video.mjpg";

            var webClient = new WebClient();
            WebClient client = new WebClient();
            client.OpenReadCompleted += (s, e) =>
            {
                byte[] imageBytes = new byte[e.Result.Length];
                e.Result.Read(imageBytes, 0, imageBytes.Length);

                // Now you can use the returned stream to set the image source too
                //var image = new BitmapImage();
                //image.SetSource(e.Result);
                //NLBI.Thumbnail.Source = image;
            };
            client.OpenReadAsync(new Uri(stream));

            Console.ReadKey();
            Console.WriteLine("Hello World!");
        }
    }
}
