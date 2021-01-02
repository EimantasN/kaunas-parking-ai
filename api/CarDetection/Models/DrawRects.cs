using System.Collections.Generic;
using System.Linq;

namespace CarDetection.Models
{
    public class DrawRects
    {
        public int x { get; set; }

        public int y { get; set; }

        public int width { get; set; }

        public int height { get; set; }

        public DrawRects(int x1, int y1, int x2, int y2)
        {
            x = x1;
            y = y1;

            width = x2 - x1;
            height = y2 - y1;
        }

        public DrawRects(List<string> data)
        {
            var parsed = data.Select(x => int.Parse(x))
                .ToList();

            var y1 = parsed[0];
            var x1 = parsed[1];
            var y2 = parsed[2];
            var x2 = parsed[3];

            x = x1;
            y = y1;

            width = x2 - x1;
            height = y2 - y1;
        }
    }
}
