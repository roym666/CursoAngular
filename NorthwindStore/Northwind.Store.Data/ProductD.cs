using System;
using System.Collections.Generic;
using System.Linq;
using Northwind.Store.Model;
using Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;

namespace Northwind.Store.Data
{
    public class ProductD : DataBase<Product>, IMaintenanceD<Product, int>
    {
        public ProductD(NWContext context) : base(context) { }
        public async Task<Product> Read(int id)
        {
            return await db.Products.Include(p => p.Category).Include(p => p.Supplier).
                AsNoTracking().SingleOrDefaultAsync(p => p.ProductId == id);
        }

        public async Task<Product> Read(string name)
        {
            Product result = null;

            result = await db.Products.Include(p => p.Category).Include(p => p.Supplier).
                Where(c => c.ProductName.Equals(name,
                    StringComparison.CurrentCultureIgnoreCase)).AsNoTracking().
                    SingleOrDefaultAsync();

            return result;
        }

        public async Task<List<Product>> ReadList(PageFilter pf = null)
        {
            List<Product> result = new List<Product>();

            if (pf != null)
            {
                var sort = new List<SortModel>() { new SortModel() { ColumnName = pf.Sort, Sort = pf.SortDir } };

                pf.Count = db.Products.Count();
                result = await db.Products.OrderBy(sort).
                    Skip(--pf.Page * pf.PageSize).
                    Take(pf.PageSize).AsNoTracking().ToListAsync();
            }
            else
            {
                result = await db.Products.AsNoTracking().ToListAsync();
            }

            return result;
        }

        public async Task Delete(int id)
        {
            await db.Database.ExecuteSqlCommandAsync("delete from products where productid = {0}",
                System.Threading.CancellationToken.None, id);
        }

        public async Task<List<Product>> Search(string filter)
        {
            List<Product> result = new List<Product>();

            result = await db.Products.Include(p => p.Category).Include(p => p.Supplier).
                Where(c => c.ProductName.Contains(filter) &&
                    !string.IsNullOrEmpty(filter)).AsNoTracking().ToListAsync();

            return result;
        }

        /// <summary>
        /// Lee la imagen de base de datos como un MemoryStream.
        /// </summary>
        /// <example>
        /// Para utilizarse en una acción de un Controller de ASP.NET MVC
        /// public FileStreamResult ReadImage(int id)
        /// {
        ///    return File(pB.ReadImageStream(id), "image/jpg");
        /// } 
        /// </example>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<MemoryStream> ReadImageStream(int id)
        {
            MemoryStream result = null;

            var image = await db.Products.Where(i => i.ProductId == id).
                Select(i => i.Picture).AsNoTracking().FirstOrDefaultAsync();

            if (image != null)
            {
                result = new MemoryStream(image);
            }

            return result;
        }

        /// <summary>
        /// Lee la imagen de base de datos como un string en Base64.
        /// </summary>
        /// <example>
        /// Para utilizarse directamente en una vista de razor. 
        /// </example>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<string> ReadImageBase64(int id)
        {
            string result = "";

            using (var ms = await ReadImageStream(id))
            {
                if (ms != null)
                {
                    var base64 = Convert.ToBase64String(ms.ToArray());
                    result = String.Format("data:image/jpg;base64,{0}", base64);
                }
            }

            return result;
        }
    }
}
