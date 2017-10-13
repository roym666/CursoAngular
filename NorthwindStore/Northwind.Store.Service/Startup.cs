using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Northwind.Store.Data;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Northwind.Store.Service.Models;

namespace Northwind.Store.Service
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<NWContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddMvc().AddJsonOptions(options =>
            {
                // Deshabilitar la serialización de propiedades relacionadas
                options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });

            services.AddCors(options => {
                options.AddPolicy("CorsPolicyFree", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
                options.AddPolicy("CorsPolicyHost", builder => builder.WithOrigins("https://localhost:44393").WithOrigins("https://localhost:1983").WithOrigins("https://localhost:44349").AllowAnyMethod().AllowAnyHeader());
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStatusCodePagesWithReExecute("/Error/{0}");
            //app.UseExceptionHandler("/Error/500");
            app.UseMiddleware(typeof(ErrorHandlingMiddleware));
            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                //app.UseStatusCodePages();
                app.UseCors("CorsPolicyFree");
            }
            else
            {
                app.UseCors("CorsPolicyHost");
            }

            // https://docs.microsoft.com/en-us/aspnet/core/security/cors
            //app.UseCors(builder => builder.WithOrigins("https://localhost:44393"));
            //app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseMvc();
        }
    }
}
