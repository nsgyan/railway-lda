
import { BeneficiaryRoutingModule } from './beneficiary-routing.module';
import { BeneficiaryListViewComponent } from './beneficiary-list-view/beneficiary-list-view.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';

import { EditBeneficiaryComponent } from './edit-beneficiary/edit-beneficiary.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BeneficiaryViewComponent } from './beneficiary-view/beneficiary-view.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BeneficiaryListViewComponent,
    AddBeneficiaryComponent,
    EditBeneficiaryComponent,
    BeneficiaryViewComponent
  ],
  imports: [
    CommonModule,
    BeneficiaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class BeneficiaryModule { }
