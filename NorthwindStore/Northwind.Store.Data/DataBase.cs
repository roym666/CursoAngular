using Microsoft.EntityFrameworkCore;
using Northwind.Store.Model;
using Northwind.Store.Notification;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Northwind.Store.Data
{
    /// <summary>
    /// Clase base la gestión del acceso a los datos. Incluye métodos básicos para el acceso a los datos.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class DataBase<T> : IDisposable where T : class, IObjectWithState
    {
        protected NWContext db = null;

        public DataBase(NWContext db)
        {
            this.db = db;
        }

        /// <summary>
        /// Aplica todos los cambios que han sido aplicados a una entidad y a todos objetos relacionados con la misma.
        /// </summary>
        /// <param name="model">Instancia del objeto.</param>
        /// <param name="nm">Mensaje de notificación (Opcional).</param>
        public async Task Save(T model, Notifications nm = null)
        {
            try
            {
                var validationErrors = db.ChangeTracker.Entries<IValidatableObject>()
                    .SelectMany(e => e.Entity.Validate(null))
                    .Where(r => r != ValidationResult.Success);

                if (validationErrors.Any())
                {
                    // Reportar los mensajes de validación
                    foreach (var ve in validationErrors)
                    {
                        var member = ve.MemberNames.First();
                        nm.Add(new Message()
                        {
                            Level = Level.Warning,
                            Description = $"La propiedad {member}. Tiene {ve.ErrorMessage}."
                        });
                    }
                }
                else
                {
                    await db.ApplyChanges<T>(model);
                }
            }
            catch (DbUpdateConcurrencyException dce)
            {
                ManageConcurrency(dce, nm);
            }
            catch (Exception ex)
            {
                while (ex != null)
                {
                    var msg = Notification.Messages.General.EXCEPTION;
                    msg.Description = ex.Message;
                    nm.Add(msg);

                    ex = ex.InnerException;
                }
            }
        }

        /// <summary>
        /// Administración de la excepción de concurrencia al momento de la actualización de datos. Construye una notificación cuando se incluye el parámetro NotificationMessage.
        /// </summary>
        /// <param name="dbe"></param>
        /// <param name="nm">Si el incluye la instancia se agrega los datos relacionados con la excepción.</param>
        protected void ManageConcurrency(DbUpdateConcurrencyException dbe, Notifications nm = null)
        {
            // Si no se incluye el parámetro de notificación se lanza la excepción
            if (nm == null)
            {
                throw dbe;
            }
            else
            {
                var entry = dbe.Entries.First();
                var client = (T)entry.Entity;               
                var serverEntry = entry.GetDatabaseValues();

                // El problema de concurrencia se da porque los datos fueron eliminados
                if (serverEntry == null)
                {
                    ConcurrencyMessage mc = Messages.General.CONCURRENCY_DELETE;
                    mc.Original = client;
                    nm.Add(mc);
                }
                // El problema de concurrencia se da porque los datos fueron actualizados
                else
                {
                    var server = (T)serverEntry.ToObject();                    

                    ConcurrencyMessage mc = Messages.General.CONCURRENCY_UPDATE;
                    mc.Original = client;
                    mc.Current = server;
                    nm.Add(mc);
                }
            }
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
