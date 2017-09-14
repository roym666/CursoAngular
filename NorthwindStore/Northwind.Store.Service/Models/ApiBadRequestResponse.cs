using Microsoft.AspNetCore.Mvc.ModelBinding;
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
    public class ApiBadRequestResponse : ApiResponse
    {
        public IEnumerable<ValidationError> Errors { get; }

        public ApiBadRequestResponse(ModelStateDictionary modelState) : base(HttpStatusCode.BadRequest)
        {
            if (modelState.IsValid)
            {
                throw new ArgumentException("ModelState must be invalid", nameof(modelState));
            }

            Errors = modelState.Select(p => new ValidationError() { Property = p.Key, Messages = p.Value.Errors.Select(ve => ve.ErrorMessage) }).ToArray();
        }

        public class ValidationError {
            public string Property { get; set; }
            public IEnumerable<string> Messages { get; set; }
        }
    }
}
