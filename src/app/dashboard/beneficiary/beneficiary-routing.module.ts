import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { BeneficiaryListViewComponent } from './beneficiary-list-view/beneficiary-list-view.component';
import { BeneficiaryViewComponent } from './beneficiary-view/beneficiary-view.component';
import { EditBeneficiaryComponent } from './edit-beneficiary/edit-beneficiary.component';

const routes: Routes = [
  {
    path: 'beneficiariesList',
    component:BeneficiaryListViewComponent
  },
  {
    path: 'addBeneficiaries',
    component:AddBeneficiaryComponent
  },
  {
    path: 'edit/:id',
    component:EditBeneficiaryComponent
  },
  {
    path: 'view/:id',
    component: BeneficiaryViewComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaryRoutingModule { }
