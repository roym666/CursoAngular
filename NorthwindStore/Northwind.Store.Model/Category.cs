using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Northwind.Store.Model
{
    public partial class Category : ModelBase
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }

        [Column("CategoryID")]
        [Key]
        public int CategoryId { get; set; }

        [MaxLength(15)]
        public string CategoryName { get; set; }
        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        [JsonIgnore]
        [Column(TypeName = "image")]
        public byte[] Picture { get; set; }

        [JsonIgnore]
        [InverseProperty("Category")]
        public virtual ICollection<Product> Products { get; set; }
    }
}
