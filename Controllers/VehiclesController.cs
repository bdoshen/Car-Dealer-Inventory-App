using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarDealerInventoryApp.Models;

namespace CarDealerInventoryApp.Controllers
{
     [Route("api/[controller]")]
     [ApiController]
     public class VehiclesController : ControllerBase
     {
          static List<Vehicle> inventory = new List<Vehicle>
          {
               new Vehicle {
                    vehicleID = 1, model = "Fusion", type = "Car", make = "Ford",
                    retailPrice = 25500.00F, sellingPrice = 30000.00F, status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Gas" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 2, model = "Dart", type = "Car", make = "Dodge",
                    retailPrice = 31000.00F, sellingPrice = 47000.00F, status = "Sold",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "2-door" },
                         new Feature { type = "Fuel", description = "Electric" },
                         new Feature { type = "Transmission", description = "Manual" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 3, model = "Navigator", type = "SUV", make = "Lincoln",
                    retailPrice = 68500.00F, sellingPrice = 75000.00F, status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Hybrid" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
          };

          static readonly List<VehicleOptions> vehicleOptions = new List<VehicleOptions>
          {
               new VehicleOptions { type = "Car", make = "Ford", model = "Focus", retailPrice = 16500.00F },
               new VehicleOptions { type = "Car", make = "Ford", model = "Fusion", retailPrice = 22000.00F },
               new VehicleOptions { type = "Truck", make = "Ford", model = "F-150", retailPrice = 24500.00F },
               new VehicleOptions { type = "Car", make = "Lincoln", model = "MKZ", retailPrice = 34500.00F },
               new VehicleOptions { type = "SUV", make = "Lincoln", model = "Navigator", retailPrice = 56000.00F },
               new VehicleOptions { type = "Car", make = "Dodge", model = "Avenger", retailPrice = 20500.00F },
               new VehicleOptions { type = "Car", make = "Dodge", model = "Dart", retailPrice = 16000.00F },
               new VehicleOptions { type = "SUV", make = "Dodge", model = "Durango", retailPrice = 29500.00F },
          };

          static readonly List<FeatureOptions> featureOptions = new List<FeatureOptions>
          {
               new FeatureOptions { type = "Doors", description = "2-door", retailPrice = 0.00F },
               new FeatureOptions { type = "Doors", description = "4-door", retailPrice = 2500.00F },
               new FeatureOptions { type = "Fuel", description = "Gas", retailPrice = 0.00F },
               new FeatureOptions { type = "Fuel", description = "Hybrid", retailPrice = 10000.00F },
               new FeatureOptions { type = "Fuel", description = "Electric", retailPrice = 15000.00F },
               new FeatureOptions { type = "Transmission", description = "Automatic", retailPrice = 1000.00F },
               new FeatureOptions { type = "Transmission", description = "Manual", retailPrice = 0.00F },
               new FeatureOptions { type = "Interior", description = "Cloth", retailPrice = 0.00F },
          };


          [HttpGet("GetInventory")]
          public IEnumerable<Vehicle> GetInventory()
          {
               return inventory;
          }

          [HttpGet("GetVehicleOptions")]
          public IEnumerable<VehicleOptions> GetVehicleOptions()
          {
               return vehicleOptions;
          }

          [HttpGet("GetFeatureOptions")]
          public IEnumerable<FeatureOptions> GetFeatureOptions()
          {
               return featureOptions;
          }

          [HttpPost("AddVehicle")]
          public IActionResult AddVehicle([FromBody] Vehicle vehicle)
          {
               try
               {
                    inventory.Add(vehicle);

                    return Ok("Successfully added vehicle to Inventory!");
               }
               catch (Exception ex)
               {
                    // write exception to log file
                    return BadRequest("Error occurred when adding vehicle to Inventory.");
               }
          }
     }    
}
