using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Northwind.Store.Service.Models
{
    /// <summary>
    /// https://stackoverflow.com/questions/38630076/asp-net-core-web-api-exception-handling
    /// https://www.devtrends.co.uk/blog/handling-errors-in-asp.net-core-web-api
    /// </summary>
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;
        private readonly IHostingEnvironment _env;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger, IHostingEnvironment env)
        {
            _next = next;
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _env = env;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            _logger.LogError(GeneralEvents.GeneralException, ex, ex.Message);

            //if (exception is MyNotFoundException) code = HttpStatusCode.NotFound;
            //else if (exception is MyUnauthorizedException) code = HttpStatusCode.Unauthorized;
            //else if (exception is MyException) code = HttpStatusCode.BadRequest;

            var code = HttpStatusCode.InternalServerError; // 500 if unexpected

            if (!context.Response.HasStarted)
            {
                context.Response.ContentType = "application/json";

                ApiResponse response = null;

                if (_env.IsDevelopment())
                {
                    string msg = "";

                    while (ex != null)
                    {
                        msg += $"{ex.Message} ";
                        ex = ex.InnerException;
                    }

                    response = new ApiResponse(code, msg);
                }
                else
                {
                    response = new ApiResponse(code);
                }

                var json = JsonConvert.SerializeObject(response, new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });

                await context.Response.WriteAsync(json);
            }
        }
    }
}