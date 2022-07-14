import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDemandRequestRoutingModule } from './payment-demand-request-routing.module';
import { PaymentDemandListComponent } from './payment-demand-list/payment-demand-list.component';
import { AddPaymentDemandComponent } from './add-payment-demand/add-payment-demand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PaymentDemandListComponent,
    AddPaymentDemandComponent
  ],
  imports: [
    CommonModule,
    PaymentDemandRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PaymentDemandRequestModule { }
