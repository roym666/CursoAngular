using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Northwind.Store.UI.Intranet.Models
{
    public partial class Territories
    {
        public Territories()
        {
            EmployeeTerritories = new HashSet<EmployeeTerritories>();
        }

        [Key]
        [Column("TerritoryID")]
        [StringLength(20)]
        public string TerritoryId { get; set; }
        [Required]
        [Column(TypeName = "nchar(50)")]
        public string TerritoryDescription { get; set; }
        [Column("RegionID")]
        public int RegionId { get; set; }

        [ForeignKey("RegionId")]
        [InverseProperty("Territories")]
        public Region Region { get; set; }
        [InverseProperty("Territory")]
        public ICollection<EmployeeTerritories> EmployeeTerritories { get; set; }
    }
}
