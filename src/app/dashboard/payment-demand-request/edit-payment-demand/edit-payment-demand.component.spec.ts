import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentDemandComponent } from './edit-payment-demand.component';

describe('EditPaymentDemandComponent', () => {
  let component: EditPaymentDemandComponent;
  let fixture: ComponentFixture<EditPaymentDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaymentDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaymentDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
