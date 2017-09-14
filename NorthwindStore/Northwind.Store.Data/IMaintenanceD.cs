using Northwind.Store.Notification;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Northwind.Store.Data
{
    public interface IMaintenanceD<T, K>
    {
        Task<T> Read(K key);
        Task<List<T>> ReadList(PageFilter pf = null);
        Task Delete(K key);
    }
}
