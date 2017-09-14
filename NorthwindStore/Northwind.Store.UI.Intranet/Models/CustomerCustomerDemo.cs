using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Northwind.Store.UI.Intranet.Models
{
    public partial class CustomerCustomerDemo
    {
        [Column("CustomerID", TypeName = "nchar(5)")]
        public string CustomerId { get; set; }
        [Column("CustomerTypeID", TypeName = "nchar(10)")]
        public string CustomerTypeId { get; set; }

        [ForeignKey("CustomerId")]
        [InverseProperty("CustomerCustomerDemo")]
        public Customers Customer { get; set; }
        [ForeignKey("CustomerTypeId")]
        [InverseProperty("CustomerCustomerDemo")]
        public CustomerDemographics CustomerType { get; set; }
    }
}
