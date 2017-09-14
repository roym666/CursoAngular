using System;
using System.Collections.Generic;
using System.Linq;
using Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Threading.Tasks;
using Northwind.Store.Model;

namespace Northwind.Store.Data
{
    public class CategoryD : DataBase<Category>, IMaintenanceD<Category, int>
    {
        public CategoryD(NWContext context) : base(context) { }

        public async Task<Category> Read(int id)
        {
            return await db.Categories.FindAsync(new object[] { id });
        }

        public async Task<List<Category>> ReadList(PageFilter pf = null)
        {
            List<Category> result = new List<Category>();
            
            if (pf != null)
            {
                var sort = new List<SortModel>() { new SortModel() { ColumnName = pf.Sort, Sort = pf.SortDir } };

                pf.Count = db.Categories.Count();
                result = await db.Categories.OrderBy(sort).
                    Skip(--pf.Page * pf.PageSize).
                    Take(pf.PageSize).AsNoTracking().ToListAsync();
            }
            else
            {
                result = await db.Categories.ToListAsync();
            }

            return result;
        }

        public async Task Delete(int id)
        {
            await db.Database.ExecuteSqlCommandAsync("delete from categories where categoryid = {0}",
                System.Threading.CancellationToken.None, id);
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

            var image = await db.Categories.Where(i => i.CategoryId == id).Select(i => i.Picture).AsNoTracking().FirstOrDefaultAsync();

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
