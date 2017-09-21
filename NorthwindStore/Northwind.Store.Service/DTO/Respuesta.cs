using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Northwind.Store.Service.DTO
{
    public class Respuesta<TEntity> where TEntity : class
    {
        public int totalPaginas = 0;
        public TEntity valorRetorno;
    }
}
