import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeatureOption } from '../models/feature-option.model';
import { VehicleOption } from '../models/vehicle-option.model';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private _inventory = new BehaviorSubject<Vehicle[]>([]);

  get inventory() {
    return this._inventory.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  getInventory() {
    this.http.get<Vehicle[]>(environment.apiURL + '/Vehicles/GetInventory').subscribe(data => {
      this._inventory.next(data);
    }, error => {
      console.log('Error getting inventory!', error);
    });
  }

  getVehicleOptions() {
    return this.http.get<VehicleOption[]>(environment.apiURL + '/Vehicles/GetVehicleOptions');
  }

  getFeatureOptions() {
    return this.http.get<FeatureOption[]>(environment.apiURL + '/Vehicles/GetFeatureOptions');
  }

  addVehicle(vehicle: Vehicle) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(environment.apiURL + '/Vehicles/AddVehicle', vehicle, { headers: headers, observe: 'response' });
  }

  updateVehicleStatus(vehicleID: number, status: string) {
    return this.http.get<FeatureOption[]>(environment.apiURL + `/Vehicles/UpdateVehicleStatus/${vehicleID}/${status}`);
  }
}
