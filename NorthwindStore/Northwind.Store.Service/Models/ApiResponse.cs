using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Northwind.Store.Service.Models
{
    /// <summary>
    /// https://www.devtrends.co.uk/blog/handling-errors-in-asp.net-core-web-api
    /// </summary>
    public class ApiResponse
    {
        public HttpStatusCode StatusCode { get; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public string Message { get; }

        public ApiResponse(HttpStatusCode statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private static string GetDefaultMessageForStatusCode(HttpStatusCode statusCode)
        {
            // TODO Resto de los códigos
            switch (statusCode)
            {
                case HttpStatusCode.NotFound:
                    return "Resource not found";
                case HttpStatusCode.InternalServerError:
                    return "An unhandled error occurred";
                default:
                    return null;
            }
        }
    }
}
