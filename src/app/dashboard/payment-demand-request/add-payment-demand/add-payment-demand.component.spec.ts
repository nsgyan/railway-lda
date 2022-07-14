import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentDemandComponent } from './add-payment-demand.component';

describe('AddPaymentDemandComponent', () => {
  let component: AddPaymentDemandComponent;
  let fixture: ComponentFixture<AddPaymentDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymentDemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
