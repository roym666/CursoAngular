using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Northwind.Store.Model
{
    [ModelMetadataType(typeof(ProductMetadata))]
    public partial class Product : ModelBase
    {
        [Required]
        [NotMapped]
        public byte[] Picture { get; set; }

        /// <summary>
        /// Fotografía en formato Base64. Para utilizar en presentación.
        /// </summary>
        [NotMapped]
        public string PictureBase64 { get; set; }

        [NotMapped]
        [ConcurrencyCheck]
        [Timestamp]
        public byte[] RowVersion { get; set; }

        class ProductMetadata
        {

        }
    }
}
