using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Northwind.Store.Data;
using Northwind.Store.Model;
using Microsoft.EntityFrameworkCore;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Northwind.Store.Service.Controllers
{
    [Route("api/Supplier"), Produces("application/json")]
    public class SupplierController : Controller
    {
        private readonly NWContext _context;

        public SupplierController(NWContext context)
        {
            _context = context;
        }

        // GET: api/supplier
        [HttpGet()]
        public async Task<IEnumerable<Supplier>> GetSuppliers(string name = "")
        {
            return await _context.Suppliers.
             Where(p => p.CompanyName.Contains(name) || string.IsNullOrEmpty(name)).
             AsNoTracking().ToListAsync();
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
