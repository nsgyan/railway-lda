import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaymentDemandComponent } from './view-payment-demand.component';

describe('ViewPaymentDemandComponent', () => {
  let component: ViewPaymentDemandComponent;
  let fixture: ComponentFixture<ViewPaymentDemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPaymentDemandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPaymentDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
