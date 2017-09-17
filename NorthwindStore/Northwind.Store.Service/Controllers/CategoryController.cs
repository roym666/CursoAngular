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
    [Route("api/Category"), Produces("application/json")]
    public class CategoryController : Controller
    {
        private readonly NWContext _context;

        public CategoryController(NWContext context)
        {
            _context = context;
        }

        // GET: api/Category
        [HttpGet()]
        public async Task<IEnumerable<Category>> GetCategories(string name = "")
        {
            return await _context.Categories.
             Where(p => p.CategoryName.Contains(name) || string.IsNullOrEmpty(name)).
             AsNoTracking().ToListAsync();
        }

        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }
    }
}
