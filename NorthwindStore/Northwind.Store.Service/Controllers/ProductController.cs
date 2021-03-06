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
using Northwind.Store.Service.DTO;
using Northwind.Store.Service.Models;
using System.Net;

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
        public async Task<IActionResult> GetProducts(string name = "", int pagina = 1, string columna = "productId", string dir = "asc")
        {
            // var objRespuesta = new Respuesta<IEnumerable<ProductDTO>>();
            var orden = new List<SortModel>() { new SortModel() { ColumnName = columna, Sort = dir } };

            var totalReg = (_context.Products.Where(p => p.ProductName.Contains(name) || string.IsNullOrEmpty(name)).Count());

            var consulta = await _context.Products.Include(p => p.Category).Include(p => p.Supplier).OrderBy(orden).
             Where(p => p.ProductName.Contains(name) || string.IsNullOrEmpty(name)).
             Skip(--pagina * 10).Take(10).
             AsNoTracking().Select(p => new ProductDTO()
             {
                 ProductId = p.ProductId,
                 ProductName = p.ProductName,
                 QuantityPerUnit = p.QuantityPerUnit,
                 UnitPrice = p.UnitPrice,
                 UnitsInStock = p.UnitsInStock,
                 UnitsOnOrder = p.UnitsOnOrder,
                 ReorderLevel = p.ReorderLevel,
                 Discontinued = p.Discontinued,
                 CategoryId = p.CategoryId,
                 CategoryName = p.Category.CategoryName,
                 SupplierId = p.SupplierId,
                 SupplierName = p.Supplier.CompanyName

             }).ToListAsync();
            //objRespuesta.valorRetorno = consulta;
            //objRespuesta.totalPaginas = totalReg / 10;
            return Ok(new { valorRetorno = consulta, totalPaginas = totalReg / 10 });
        }

        [HttpGet("productsWeb")]
        public async Task<IEnumerable<ProductDTO>> GetProductsWeb(string name = "")
        {
            return await _context.Products.Include(p => p.Category).Include(p => p.Supplier).
            Where(p => p.ProductName.Contains(name) || string.IsNullOrEmpty(name)).
            AsNoTracking().Select(p => new ProductDTO()
            {
                ProductId = p.ProductId,
                ProductName = p.ProductName,
                QuantityPerUnit = p.QuantityPerUnit,
                UnitPrice = p.UnitPrice,
                UnitsInStock = p.UnitsInStock,
                UnitsOnOrder = p.UnitsOnOrder,
                ReorderLevel = p.ReorderLevel,
                Discontinued = p.Discontinued,
                CategoryId = p.CategoryId,
                CategoryName = p.Category.CategoryName,
                SupplierId = p.SupplierId,
                SupplierName = p.Supplier.CompanyName
            }
            ).ToListAsync();
        }

        // GET: api/Product/5
        [ApiValidationFilter]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProducts([FromRoute] int id)
        {
            await Task.Delay(1000);
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(new ApiBadRequestResponse(ModelState));
            //}

            var products = await _context.Products.Include(p => p.Category).Include(p => p.Supplier).
                AsNoTracking().SingleOrDefaultAsync(m => m.ProductId == id);

            if (products == null)
            {
                return NotFound(new ApiResponse(System.Net.HttpStatusCode.NotFound, $"product not found with id{id}"));
            }

            return Ok(products);
        }

        // PUT: api/Product/5
        [ApiValidationFilter]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts([FromRoute] int id, [FromBody] Product products)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            if (id != products.ProductId)
            {
                return BadRequest(new ApiResponse(System.Net.HttpStatusCode.BadRequest, $"product ids are different {id} != {products.ProductId}"));
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
                    return NotFound(new ApiResponse(System.Net.HttpStatusCode.NotFound, $"product not found with id{id}"));
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Product
        [ApiValidationFilter]
        [HttpPost]
        public async Task<IActionResult> PostProducts([FromBody] Product products)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(new ApiBadRequestResponse(ModelState));
            //}

            _context.Products.Add(products);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = products.ProductId }, products);
        }

        // DELETE: api/Product/5
        [ApiValidationFilter]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducts([FromRoute] int id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            try
            {
                var products = await _context.Products.SingleOrDefaultAsync(m => m.ProductId == id);
                if (products == null)
                {
                    return NotFound(new ApiResponse(System.Net.HttpStatusCode.NotFound, $"product not found with id {id}"));
                }

                _context.Products.Remove(products);
                await _context.SaveChangesAsync();

                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"Delete error: {ex.Message}");
            }
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

        [HttpGet("{id}/rank")]
        public async Task<object> GetRank(int id)
        {
            var rank = _context.OrderDetails.Where(od => od.ProductId == id).Select(od => od.Order).GroupBy(o => o.ShipCountry).
                Select(g => new { Country = g.Key, Quantity = g.Count() }).OrderByDescending(g => g.Quantity);
            return await rank.ToListAsync();
        }
    }
}