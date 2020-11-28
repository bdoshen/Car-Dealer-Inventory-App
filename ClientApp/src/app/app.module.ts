import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryComponent } from './components/inventory/inventory.component';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule } from '@angular/material';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AddVehicleModalComponent } from './components/add-vehicle-modal/add-vehicle-modal.component';
import { VehicleDetailsModalComponent } from './components/vehicle-details-modal/vehicle-details-modal.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    InventoryComponent,
    AddVehicleModalComponent,
    VehicleDetailsModalComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIconModule,
    NgxChartsModule,
    RouterModule.forRoot([
      { path: '', component: InventoryComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddVehicleModalComponent,
    VehicleDetailsModalComponent,
    ConfirmationModalComponent
  ]
})
export class AppModule { }
