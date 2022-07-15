import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPaymentDemandComponent } from './add-payment-demand/add-payment-demand.component';
import { PaymentDemandListComponent } from './payment-demand-list/payment-demand-list.component';

const routes: Routes = [
  {path:'list', component:PaymentDemandListComponent},
  {path:'add', component:AddPaymentDemandComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentDemandRequestRoutingModule { }
