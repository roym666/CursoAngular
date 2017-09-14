using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Northwind.Store.Model
{
    [ModelMetadataType(typeof(CategoryMetadata))]
    public partial class Category : ModelBase
    {
        [NotMapped]
        [ConcurrencyCheck]
        [Timestamp]
        public byte[] RowVersion { get; set; }

        /// <summary>
        /// Fotografía en formato Base64. Para utilizar en presentación.
        /// </summary>
        [NotMapped]
        public string PictureBase64 { get; set; }

        public class CategoryMetadata
        {
            [StringLength(15, MinimumLength = 5, 
                ErrorMessage = "Se requiere entre {2} y {1} caracteres.")]
            [Required(ErrorMessage = "El {0} es requerido.")]
            [Display(Name = "Nombre")]
            public string CategoryName { get; set; }

            [StringLength(1024, MinimumLength = 16,
                ErrorMessage = "Se requiere entre {2} y {1} caracteres.")]
            [Required(ErrorMessage = "La {0} es requerida.")]
            [Display(Name = "Descripción")]
            public string Description { get; set; }

            [Display(Name = "Imagen")]
            public byte[] Picture { get; set; }
        }
    }
}
