using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
    public static class CIDMSeed
    {
        public static List<(string, string)> MRCnnStreamSources = new List<(string, string)>
        {
            ("http://80.34.181.34:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1$", "Canarias, Playa Del Ingles"),
            ("http://118.220.7.47:8000/webcapture.jpg?command=snap&channel=1$", "Gyeonggi-Do, Seongnam"),
            ("http://218.217.95.45:60001/cgi-bin/snapshot.cgi?chn=0&u=admin&p=&q=0", "Saitama, Saitama"),
            ("http://220.157.160.198:8080/-wvhttp-01-/GetOneShot", "Osaka, Japan"),
            ("http://89.250.150.72:90/webcapture.jpg?command=snap&channel=7", "Tyumenskaya Oblast, Tyumen"),
            ("http://89.250.150.72:90/webcapture.jpg?command=snap&channel=1", "Sankt-Peterburg, Saint Petersburg"),
            ("http://166.141.239.215:8082/-wvhttp-01-/GetOneShot", "Texas, Houston"),
            ("http://220.158.85.74:60001/cgi-bin/snapshot.cgi?chn=1&u=admin&p=&q=0", "Tokyo, Tokyo")
        };

        public static void Seed(CIDMDbContext context)
        {
            if (!context.MRCnnSettings.Any())
            {
                context.MRCnnSettings.Add(new MRCnnSetting()
                {
                    Sources = new List<StreamSource>(),
                });

                context.SaveChanges();
            }

            var MrcnnId = context.MRCnnSettings.First().Id;

            foreach (var (url, name) in MRCnnStreamSources)
            {
                if (!context.Sources.Any(x => x.Url == url && x.MRCnnSettingId == MrcnnId))
                {
                    context.Sources.Add(new StreamSource()
                    {
                        Url = url,
                        Increment = 1,
                        Title = name,
                        Miliseconds = 1000,
                        Refresh = true,
                        MRCnnSettingId = MrcnnId,
                        Selected = new List<Rect>()
                        {
                            new Rect()
                            {
                                x1 = 0,
                                x2 = 0,
                                y1 = 0,
                                y2 = 0
                            }
                        }
                    });
                }
            }
            context.SaveChanges();
        }
    }
}
