﻿using Microsoft.AspNetCore.Http;
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
                    vehicleID = 1, make = "Ford", model = "Fusion", year = 2019, type = "Car", 
                    retailPrice = "25500.00", sellingPrice = "30000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Gas" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 2, make = "Dodge", model = "Dart", year = 2017, type = "Car", 
                    retailPrice = "31000.00", sellingPrice = "47000.00", status = "Sold",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "2-door" },
                         new Feature { type = "Fuel", description = "Electric" },
                         new Feature { type = "Transmission", description = "Manual" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 3, make = "Lincoln", model = "Navigator", year = 2018, type = "SUV", 
                    retailPrice = "68500.00", sellingPrice = "75000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Hybrid" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 4, make = "Lincoln", model = "MKZ", year = 2019, type = "Car",
                    retailPrice = "48000.00", sellingPrice = "55000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Hybrid" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 5, make = "Ford", model = "Focus", year = 2020, type = "Car",
                    retailPrice = "32500.00", sellingPrice = "45000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "2-door" },
                         new Feature { type = "Fuel", description = "Electric" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 6, make = "Ford", model = "Focus", year = 2012, type = "Car",
                    retailPrice = "19000.00", sellingPrice = "25000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Gas" },
                         new Feature { type = "Transmission", description = "Manual" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 7, make = "Ford", model = "F-150", year = 2020, type = "Truck",
                    retailPrice = "38000.00", sellingPrice = "47000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Hybrid" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 8, make = "Dodge", model = "Dart", year = 2018, type = "Car",
                    retailPrice = "17000.00", sellingPrice = "20000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "2-door" },
                         new Feature { type = "Fuel", description = "Gas" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 9, make = "Dodge", model = "Avenger", year = 2015, type = "Car",
                    retailPrice = "24000.00", sellingPrice = "30000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Gas" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 10, make = "Dodge", model = "Durango", year = 2020, type = "SUV",
                    retailPrice = "48000.00", sellingPrice = "62500.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Electric" },
                         new Feature { type = "Transmission", description = "Automatic" },
                         new Feature { type = "Interior", description = "Cloth" },
                    }
               },
               new Vehicle {
                    vehicleID = 11, make = "Dodge", model = "Durango", year = 2011, type = "SUV",
                    retailPrice = "32000.00", sellingPrice = "38000.00", status = "For Sale",
                    features = new List<Feature>
                    {
                         new Feature { type = "Doors", description = "4-door" },
                         new Feature { type = "Fuel", description = "Gas" },
                         new Feature { type = "Transmission", description = "Manual" },
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
          [ProducesResponseType(StatusCodes.Status200OK)]
          [ProducesResponseType(StatusCodes.Status400BadRequest)]
          public IActionResult AddVehicle([FromBody] Vehicle vehicle)
          {
               try
               {
                    inventory.Add(vehicle);

                    return Ok();
               }
               catch (Exception ex)
               {
                    // write exception to log file
                    return BadRequest();
               }
          }

          [HttpGet("UpdateVehicleStatus/{vehicleID}/{status}")]
          [ProducesResponseType(StatusCodes.Status200OK)]
          [ProducesResponseType(StatusCodes.Status400BadRequest)]
          public IActionResult UpdateVehicleStatus([FromRoute] int vehicleID, [FromRoute] string status)
          {
               try
               {
                    var itemToRemove = inventory.Single(r => r.vehicleID == vehicleID);
                    inventory.Remove(itemToRemove);

                    return Ok();
               }
               catch (Exception ex)
               {
                    // write exception to log file
                    return BadRequest();
               }
          }
     }    
}
