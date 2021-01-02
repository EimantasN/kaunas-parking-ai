using Domain.Entities;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
    public static class CIDMSeed
    {
        public static List<string> MRCnnStreamSources = new List<string>
        {
            "http://80.34.181.34:85/jpgmulreq/1/image.jpg?key=1516975535684&lq=1$",
            "http://118.220.7.47:8000/webcapture.jpg?command=snap&channel=1$",
            "http://218.217.95.45:60001/cgi-bin/snapshot.cgi?chn=0&u=admin&p=&q=0"
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

            foreach (var url in MRCnnStreamSources)
            {
                if (!context.Sources.Any(x => x.Url == url && x.MRCnnSettingId == MrcnnId))
                {
                    context.Sources.Add(new StreamSource()
                    {
                        Url = url,
                        Increment = 1,
                        Miliseconds = 1000,
                        Refresh = true,
                        MRCnnSettingId = MrcnnId
                    });
                }
            }
            context.SaveChanges();
        }
    }
}
