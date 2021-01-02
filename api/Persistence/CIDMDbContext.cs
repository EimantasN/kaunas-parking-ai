using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public partial class CIDMDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(PersistanceConstants.DatabaseConection,
                    o => o.CommandTimeout(PersistanceConstants.DatabaseTimeout));
            }
            base.OnConfiguring(optionsBuilder);
        }

        public DbSet<MRCnnSetting> MRCnnSettings { get; set; }

        public DbSet<StreamSource> Sources { get; set; }

        public DbSet<Rect> Rects { get; set; }
    }
}
