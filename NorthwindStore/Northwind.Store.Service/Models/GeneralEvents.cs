using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Northwind.Store.Service.Models
{
    public class GeneralEvents
    {
        public static readonly EventId GeneralException = new EventId(100, "Excepción de la aplicación");
    }
}
