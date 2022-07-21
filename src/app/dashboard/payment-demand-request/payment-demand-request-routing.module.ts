
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPaymentDemandComponent } from './add-payment-demand/add-payment-demand.component';
import { EditPaymentDemandComponent } from './edit-payment-demand/edit-payment-demand.component';
import { PaymentDemandListComponent } from './payment-demand-list/payment-demand-list.component';
import { ViewPaymentDemandComponent } from './view-payment-demand/view-payment-demand.component';

const routes: Routes = [
  {path:'list', component:PaymentDemandListComponent},
  {path:'add', component:AddPaymentDemandComponent},
  {path:'edit/:id', component:EditPaymentDemandComponent},
  {path:'view/:id', component:ViewPaymentDemandComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentDemandRequestRoutingModule { }
