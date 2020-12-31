using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Persistence
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddPersistence(this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<CIDMDbContext>();

            services.AddHealthChecks()
                .AddDbContextCheck<CIDMDbContext>();

            PersistanceConstants.DatabaseConection = configuration
                .GetConnectionString(PersistanceConstants.DbConnection);

            return services;
        }
    }
}
