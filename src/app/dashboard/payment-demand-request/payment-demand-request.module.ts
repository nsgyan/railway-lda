import {MatFormFieldModule} from '@angular/material/form-field';
import { PaymentDemandRequestRoutingModule } from './payment-demand-request-routing.module';
import { PaymentDemandListComponent } from './payment-demand-list/payment-demand-list.component';
import { AddPaymentDemandComponent } from './add-payment-demand/add-payment-demand.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatSelectModule} from '@angular/material/select';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    PaymentDemandListComponent,
    AddPaymentDemandComponent
  ],
  imports: [
    CommonModule,
    PaymentDemandRequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    NgMultiSelectDropDownModule,
    MatDialogModule

  ]
})
export class PaymentDemandRequestModule { }
