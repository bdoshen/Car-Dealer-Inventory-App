import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogModel } from 'src/app/models/confirm-dialog.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-vehicle-details-modal',
  templateUrl: './vehicle-details-modal.component.html',
  styleUrls: ['./vehicle-details-modal.component.css']
})
export class VehicleDetailsModalComponent implements OnInit {
  make: string;
  model: string;
  year: string;
  doors: string;
  fuel: string;
  transmission: string;
  interior: string;
  sellingPrice: number;

  markVehcileAsSold = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<VehicleDetailsModalComponent>,
    private snackBar: MatSnackBar,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.make = this.data.row.make;
    this.model = this.data.row.model;
    this.year = this.data.row.year;
    this.doors = this.data.row.features.filter(f => f.type === 'Doors')[0].description;
    this.fuel = this.data.row.features.filter(f => f.type === 'Fuel')[0].description;
    this.transmission = this.data.row.features.filter(f => f.type === 'Transmission')[0].description;
    this.interior = this.data.row.features.filter(f => f.type === 'Interior')[0].description;
    this.sellingPrice = this.data.row.sellingPrice;
  }

  onMarkVehicleAsSoldClick() {
    const message = `Are you sure to mark this vehicle as sold?`;

    const dialogData = new ConfirmDialogModel('Mark Vehicle as Sold', message);

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.markVehcileAsSold = true;
        this.dialogRef.disableClose = true;

        this.vehicleService.updateVehicleStatus(this.data.row.vehicleID, 'Sold').subscribe(() => {
          // to give it the feel that there is a sligh delay due to it writing to an acutal DB
          setTimeout(() => {
            this.openSnackBar('Successfully marked vehicle as sold!', 'success');
            this.vehicleService.getInventory();
            this.dialogRef.close();
          }, 1000);
        }, error => {
          this.openSnackBar('Error marking vehicle as sold.', 'error');
          console.log('Error marking vehicle as sold.', error);
          this.dialogRef.close();
        });
      }
    });
  }

  openSnackBar(message: string, status: string) {
    if (status === 'success') {
      this.snackBar.open(message, '', {
        duration: 2000,
        panelClass: ['success-snackbar']
      });
    } else if (status === 'error') {
      this.snackBar.open(message, '', {
        duration: 2000,
        panelClass: ['error-snackbar']
      });
    }
  }

}
