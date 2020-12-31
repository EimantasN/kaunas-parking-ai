using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Persistence
{
    public static class CIDMSeed
    {
        public static void Seed(CIDMDbContext context)
        {
            if (!context.MRCnnSettings.Any())
            {
                context.MRCnnSettings.Add(new MRCnnSetting()
                {
                    Id = 0,
                    Source = "",
                    Created = DateTime.UtcNow,
                    Updated = DateTime.UtcNow,
                    Selected = new List<Rect>(),
                });

                context.SaveChanges();
            }
        }
    }
}
