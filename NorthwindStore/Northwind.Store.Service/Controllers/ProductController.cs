using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Northwind.Store.Data;
using Northwind.Store.Model;
using Linq.Extensions;

namespace Northwind.Store.Service.Controllers
{
    [Produces("application/json")]
    [Route("api/Product")]
    public class ProductController : Controller
    {
        private readonly NWContext _context;

        public ProductController(NWContext context)
        {
            _context = context;
        }

        // GET: api/Product
        [HttpGet()]
        public async Task<IEnumerable<Product>> GetProducts(string name = "")
        {
            return await _context.Products.Include(p => p.Category).Include(p => p.Supplier).
             Where(p => p.ProductName.Contains(name) || string.IsNullOrEmpty(name)).
             AsNoTracking().ToListAsync();
        }

        // GET: api/Product/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProducts([FromRoute] int id)
        {
            await Task.Delay(1000);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var products = await _context.Products.Include(p => p.Category).Include( p=> p.Supplier).
                AsNoTracking().SingleOrDefaultAsync(m => m.ProductId == id);

            if (products == null)
            {
                return NotFound();
            }

            return Ok(products);
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts([FromRoute] int id, [FromBody] Product products)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != products.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        [HttpPost]
        public async Task<IActionResult> PostProducts([FromBody] Product products)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.ProductId }, products);
        }

        // DELETE: api/Product/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducts([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var products = await _context.Products.SingleOrDefaultAsync(m => m.ProductId == id);
            if (products == null)
            {
                return NotFound();
            }

            _context.Products.Remove(products);
            await _context.SaveChangesAsync();

            return Ok(products);
        }

        /// <summary>
        /// POSIBLE Implementación de paginación
        /// </summary>
        /// <param name="pf"></param>
        /// <returns></returns>
        private async Task<List<Product>> ReadList(PageFilter pf = null)
        {
            List<Product> result = new List<Product>();

            if (pf != null)
            {
                var sort = new List<SortModel>() { new SortModel() { ColumnName = pf.Sort, Sort = pf.SortDir } };

                pf.Count = _context.Products.Count();
                result = await _context.Products.OrderBy(sort).
                    Skip(--pf.Page * pf.PageSize).
                    Take(pf.PageSize).AsNoTracking().ToListAsync();
            }
            else
            {
                result = await _context.Products.AsNoTracking().ToListAsync();
            }

            return result;
        }

        private bool ProductsExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}