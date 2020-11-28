import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { FeatureOption } from 'src/app/models/feature-option.model';
import { Feature } from 'src/app/models/feature.model';
import { VehicleOption } from 'src/app/models/vehicle-option.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-add-vehicle-modal',
  templateUrl: './add-vehicle-modal.component.html',
  styleUrls: ['./add-vehicle-modal.component.css']
})
export class AddVehicleModalComponent implements OnInit, OnDestroy {
  private vehicleOptionsSubscription: Subscription;
  private featureOptionsSubscription: Subscription;
  private inventorySubscription: Subscription;

  // used to keep track of what the next ID is in the array
  vehicleID = 0;

  addNewVehicleClicked = false;

  form = new FormGroup({
    make: new FormControl(null, {
      validators: [Validators.required]
    }),
    model: new FormControl({value: null, disabled: true}, {
      validators: [Validators.required]
    }),
    year: new FormControl(null, {
      validators: [Validators.required]
    }),
    doors: new FormControl(null, {
      validators: [Validators.required]
    }),
    fuel: new FormControl(null, {
      validators: [Validators.required]
    }),
    transmission: new FormControl(null, {
      validators: [Validators.required]
    }),
    interior: new FormControl({value: 'Cloth', disabled: true}),
    retailPrice: new FormControl({value: 0.00, disabled: true}, {
      validators: [Validators.required]
    }),
    markUpPercentage: new FormControl(null),
    sellingPrice: new FormControl({value: 0, disabled: true}, {
      validators: [Validators.required]
    }),
  });

  vehicleOptions: VehicleOption[];
  featureOptions: FeatureOption[];

  vehicleMakes: Set<string[]>;
  vehicleModels: string[] = [];
  vehicleYears: number[] = [];

  featureDoors: Set<FeatureOption>;
  featureFuel: Set<FeatureOption>;
  featureTransmission: Set<FeatureOption>;

  constructor(
    private vehicleService: VehicleService,
    private dialogRef: MatDialogRef<AddVehicleModalComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.vehicleOptionsSubscription = this.vehicleService.getVehicleOptions().subscribe(data => {
      if (data.length !== 0) {
        const vehicleMakes = [];

        data.sort((a, b) => {
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
        });

        data.forEach(vehicle => {
          vehicleMakes.push(vehicle.make);
        });

        // a set allows us to store distinct data, therefore it removed duplicate vehicle makes
        this.vehicleMakes = new Set(vehicleMakes);

        this.vehicleOptions = data;
      }
    }, error => {
      console.log('Error getting vehicle options!', error);
    });

    this.featureOptionsSubscription = this.vehicleService.getFeatureOptions().subscribe(data => {
      if (data.length !== 0) {
        const featureTypes = [];

        data.sort((a, b) => {
          if (a.type < b.type) {
            return -1;
          }
          if (a.type > b.type) {
            return 1;
          }
          if (a.description < b.description) {
            return -1;
          }
          if (a.description > b.description) {
            return 1;
          }
        });

        data.forEach(feature => {
          featureTypes.push(feature.description);
        });

        // a set allows us to store distinct data, therefore it removed duplicate feature doors
        this.featureDoors = new Set(data.filter(f => f.type === 'Doors'));

        // a set allows us to store distinct data, therefore it removed duplicate feature fuel
        this.featureFuel = new Set(data.filter(f => f.type === 'Fuel'));

        // a set allows us to store distinct data, therefore it removed duplicate feature transmission
        this.featureTransmission = new Set(data.filter(f => f.type === 'Transmission'));

        this.featureOptions = data;
      }
    }, error => {
      console.log('Error getting feature options!', error);
    });

    this.inventorySubscription = this.vehicleService.inventory.subscribe(data => {
      if (data.length !== 0) {
        this.vehicleID = data[data.length - 1].vehicleID + 1;
      } else {
        this.vehicleID = 1000;
      }
    });

    // creates the years available for current vehicles
    // 1908 was the first year cars were availabel in America so we stopped it there
    for (let i = new Date().getFullYear(); i >= 1908; i--) {
      this.vehicleYears.push(i);
    }

    this.onFormChange();
  }

  ngOnDestroy() {
    if (this.vehicleOptionsSubscription) {
      this.vehicleOptionsSubscription.unsubscribe();
    }

    if (this.featureOptionsSubscription) {
      this.featureOptionsSubscription.unsubscribe();
    }

    if (this.inventorySubscription) {
      this.inventorySubscription.unsubscribe();
    }
  }

  onFormChange() {
    this.form.controls.make.valueChanges.subscribe(make => {
      this.form.controls.model.disable();
      this.form.controls.model.setValue(null);
      this.vehicleModels = [];

      // gets all the vehicles of the same make that was selected
      const vehicles = this.vehicleOptions.filter(v => v.make === make);

      vehicles.forEach(vehicle => {
        this.vehicleModels.push(vehicle.model);
      });

      this.form.controls.model.enable();
    });

    this.form.valueChanges.subscribe(newVehicle => {
      // if the form controls all have values then calculate total retail price
      if (this.form.valid) {
        let calculatedRetailPrice = 0.00;
        let calculatedSellingPrice = 0.00;

        const modelRetailPrice = this.vehicleOptions.filter(v => v.model === newVehicle.model)[0].retailPrice;
        const doorRetailPrice = this.featureOptions.filter(f => f.description === newVehicle.doors)[0].retailPrice;
        const fuelRetailPrice = this.featureOptions.filter(f => f.description === newVehicle.fuel)[0].retailPrice;
        const transmissionRetailPrice = this.featureOptions.filter(f => f.description === newVehicle.transmission)[0].retailPrice;

        // add up the retail price of the vehicle model selected and all the selected features
        calculatedRetailPrice = modelRetailPrice + doorRetailPrice + fuelRetailPrice + transmissionRetailPrice;
        this.form.controls.retailPrice.setValue(calculatedRetailPrice, {emitEvent: false});

        this.form.controls.markUpPercentage.setValidators(Validators.required);

        // calculating selling price: first we need to convert the whole number value for markUpPercentage to an actual percentage
        // multiply the calculatedRetailPrice by that percentage to give use the markUpPrice value
        // add the markUpPrice to the calculatedRetailPrice to give us the calculatedSellingPrice
        // Ex: Calculated Retail Price = $59,500 and the dealer wants to mark it up 10% then the Calculated Selling Price would be $65,450
        const markUpPrice = calculatedRetailPrice * (+this.form.controls.markUpPercentage.value / 100);
        calculatedSellingPrice = calculatedRetailPrice + markUpPrice;

        this.form.controls.sellingPrice.setValue(calculatedSellingPrice, {emitEvent: false});
      }
    });
  }

  AddNewVehicleOnClick() {
    // if the form isn't valid then we dont want to attempt to save it to the DB
    if (!this.form.valid) {
      return;
    } else {
      this.addNewVehicleClicked = true;
      this.dialogRef.disableClose = true;

      const type = this.vehicleOptions.filter(v => v.model === this.form.controls.model.value)[0].type;

      const newVehicle = <Vehicle>{
        vehicleID: this.vehicleID,
        make: this.form.controls.make.value,
        model: this.form.controls.model.value,
        year: +this.form.controls.year.value,
        type: type,
        retailPrice: this.form.controls.retailPrice.value.toString(),
        sellingPrice: this.form.controls.sellingPrice.value.toString(),
        features: <Feature[]>[
          { type: 'Doors', description: this.form.controls.doors.value },
          { type: 'Fuel', description: this.form.controls.fuel.value },
          { type: 'Transmission', description: this.form.controls.transmission.value },
          { type: 'Interior', description: this.form.controls.interior.value },
        ],
        feature: '',
        status: 'For Sale'
      };

      this.vehicleService.addVehicle(newVehicle).subscribe(() => {
        // to give it the feel that there is a sligh delay due to it writing to an acutal DB
        setTimeout(() => {
          this.openSnackBar('Successfully added new vehicle!', 'success');
          this.vehicleService.getInventory();
          this.dialogRef.close();
        }, 1000);
      }, error => {
        this.openSnackBar('Error adding new vehicle!', 'error');
        console.log('Error adding new vehicle.', error);
        this.dialogRef.close();
      });
    }
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
