using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Northwind.Store.Service.Models
{
    public class ApiOkResponse : ApiResponse
    {
        public object Result { get; }

        public ApiOkResponse(object result) : base(HttpStatusCode.OK)
        {
            Result = result;
        }
    }
}
