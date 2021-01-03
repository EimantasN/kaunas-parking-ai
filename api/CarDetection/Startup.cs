using CarDetection.HostedServices;
using CarDetection.Interfaces;
using CarDetection.MLModels;
using CarDetection.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

namespace CarDetection
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostEnvironment host)
        {
            Configuration = configuration;
            Enviroment.Setup(host);
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddPersistence(Configuration);
            services.AddHttpClient();

            services.AddCors(o => o.AddPolicy("React", builder =>
            {
                builder
                .WithOrigins(
                    "https://p170m109.endev.lt",
                    "http://p170m109.endev.lt",
                    "http://localhost:3000",
                    "http://192.168.0.108:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
            }));

            services.AddControllers();

            services.AddOpenApiDocument(configure =>
            {
                configure.Title = "Car detection API for Kaunas City";
                configure.Version = "1.7";
            });

            services.AddSingleton<IDetection, DetectionService>();

            // Model Controls
            services.AddSingleton<IModelControls, ModelControls>();

            // Register Ml Models
            services.AddSingleton<IMRCnnModel, MRCnnModel>();

            // Model wathcer
            services.AddHostedService<MRCnnHostedService>();
            services.AddHostedService<StreamImageLoader>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("React");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            app.UseStaticFiles();
            app.UseOpenApi();

            app.UseSwaggerUi3(settings =>
            {
                settings.Path = "/api";
            });

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
