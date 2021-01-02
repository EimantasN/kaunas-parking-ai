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
                    Sources = new List<StreamSource>(),
                });

                context.SaveChanges();
            }
        }
    }
}
