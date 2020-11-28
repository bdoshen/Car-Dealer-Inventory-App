import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleModalComponent } from './add-vehicle-modal.component';

describe('AddVehicleModalComponent', () => {
  let component: AddVehicleModalComponent;
  let fixture: ComponentFixture<AddVehicleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVehicleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
