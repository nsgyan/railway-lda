import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDemandListComponent } from './payment-demand-list.component';

describe('PaymentDemandListComponent', () => {
  let component: PaymentDemandListComponent;
  let fixture: ComponentFixture<PaymentDemandListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentDemandListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentDemandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
