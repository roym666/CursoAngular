using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Northwind.Store.Service.Models;
using System.Net;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Northwind.Store.Service.Controllers
{
    public class ErrorController : Controller
    {
        [HttpGet("Error/{code}")]
        public IActionResult Index(int code)
        {
            ObjectResult result = null;
            var ex = this.HttpContext.Features.Get<IExceptionHandlerFeature>();
            if (ex != null)
            {
                result = new ObjectResult(new ApiResponse(HttpStatusCode.InternalServerError, ex.Error.Message));
            }
            else
            {
                result = new ObjectResult(new ApiResponse((HttpStatusCode)code));
            }
            return result;
        }
    }
}
