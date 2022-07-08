import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerwayRoutingModule } from './serway-routing.module';
import { SerwayListComponent } from './serway-list/serway-list.component';
import { AddserwayComponent } from './addserway/addserway.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SerwayListComponent,
    AddserwayComponent
  ],
  imports: [
    CommonModule,
    SerwayRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class SerwayModule { }
