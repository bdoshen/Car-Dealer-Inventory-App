import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { AddVehicleModalComponent } from '../add-vehicle-modal/add-vehicle-modal.component';
import { VehicleDetailsModalComponent } from '../vehicle-details-modal/vehicle-details-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, OnDestroy {
  private inventorySubscription: Subscription;
  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  dataSource = new MatTableDataSource<Vehicle>([]);

  // used to dynamically load columns and data for the rows
  displayedColumns = [
    'make', 'model', 'year', 'type', 'feature', 'sellingPrice', 'details'
  ];

  // used to dynamically load columns and data for the rows
  tableDef: Array<any> = [
    {key: 'make', header: 'Make'},
    {key: 'model', header: 'Model'},
    {key: 'year', header: 'Year'},
    {key: 'type', header: 'Type'},
    {key: 'feature', header: 'Features'},
    {key: 'sellingPrice', header: 'Calculated Sales Price'},
    {key: 'details', header: 'Details'},
  ];

  // used to make sure I don't call GetInventory multiple times
  calledGetInventory = false;

  // used to show that no data exists
  noInventoryExists = false;

  // used to calculate the total inventory values
  totalPotentialProfit = 0.00;
  totalRetailPrice = 0.00;
  totalPriceOfInventory = 0.00;

  // pie options
  reportResults: any[];
  view: any[] = [700, 400];
  showLegend = true;
  showLabels = false;
  explodeSlices = false;
  colorScheme = {
    domain: ['#5AA454', '#DB794F']
  };

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.inventorySubscription = this.vehicleService.inventory.subscribe(data => {
      if (data.length === 0 && !this.calledGetInventory) {
        this.noInventoryExists = true;
        this.totalPriceOfInventory = 0.00;
        this.totalRetailPrice = 0.00;
        this.totalPriceOfInventory = 0.00;

        this.vehicleService.getInventory();
      } else if (data.length !== 0) {
        this.noInventoryExists = false;
        let inventory = data;

        // if inventory changes reset totals to 0.00
        this.totalPriceOfInventory = 0.00;
        this.totalRetailPrice = 0.00;
        this.totalPriceOfInventory = 0.00;

        // we only want to show cars that are currently for sale
        inventory = inventory.filter(vehicles => vehicles.status === 'For Sale');

        inventory.forEach(vehicle => {
          let vehicleFeature = '';

          vehicle.features.forEach(feature => {
            vehicleFeature = vehicleFeature + feature.type + ': ' + feature.description + '\n';
          });

          vehicle.feature = vehicleFeature;

          this.totalPriceOfInventory = this.totalPriceOfInventory + +vehicle.sellingPrice;
          this.totalRetailPrice = this.totalRetailPrice + +vehicle.retailPrice;
          this.totalPotentialProfit = this.totalPotentialProfit + (+vehicle.sellingPrice - +vehicle.retailPrice);
        });

        // sort by make first then by model then by year
        inventory.sort((a, b) => {
          if (a.make < b.make) {
            return -1;
          }
          if (a.make > b.make) {
            return 1;
          }
          if (a.model < b.model) {
            return -1;
          }
          if (a.model > b.model) {
            return 1;
          }
          return a.year - b.year;
        });

        // pie graph data
        this.reportResults = <any>[
          { name: 'Total Potential Profit', value: this.totalPotentialProfit},
          { name: 'Total Retail Price', value: this.totalRetailPrice},
        ];

        this.dataSource.data = inventory;
        this.noInventoryExists = inventory.length === 0 ? true : false;
      } else if (data.length === 0 && this.calledGetInventory) {
        this.noInventoryExists = true;

        // if inventory changes reset totals to 0.00
        this.totalPriceOfInventory = 0.00;
        this.totalRetailPrice = 0.00;
        this.totalPriceOfInventory = 0.00;
      }
    });
  }

  ngOnDestroy() {
    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }

  openAddVehicleDialog() {
    const dialog = this.dialog.open(AddVehicleModalComponent, {
      data: { },
      minWidth: '50vw',
      panelClass: 'dialog-panel'
    });
  }

  onRowClick(row: Vehicle) {
    const dialog = this.dialog.open(VehicleDetailsModalComponent, {
      data: { row },
      minWidth: '50vw',
      panelClass: 'dialog-panel'
    });
  }

}
