using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarDealerInventoryApp.Models
{
     public class Vehicle
     {
          public int vehicleID { get; set; }
          public string make { get; set; }
          public string model { get; set; }
          public int year { get; set; }
          public string type { get; set; }
          public string retailPrice { get; set; }
          public string sellingPrice { get; set; }
          public List<Feature> features { get; set; }
          public string status { get; set; }
     }
}
