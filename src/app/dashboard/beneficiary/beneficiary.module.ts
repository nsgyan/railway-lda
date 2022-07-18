import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryRoutingModule } from './beneficiary-routing.module';
import { BeneficiaryListViewComponent } from './beneficiary-list-view/beneficiary-list-view.component';
import { AddBeneficiaryComponent } from './add-beneficiary/add-beneficiary.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBeneficiaryComponent } from './edit-beneficiary/edit-beneficiary.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BeneficiaryListViewComponent,
    AddBeneficiaryComponent,
    EditBeneficiaryComponent
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
