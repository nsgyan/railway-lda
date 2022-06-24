import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { StateMasterComponent } from './state-master/state-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistictMasterComponent } from './distict-master/distict-master.component';
import { BlockMasterComponent } from './block-master/block-master.component';
import { VillageMasterComponent } from './village-master/village-master.component';


@NgModule({
  declarations: [
    StateMasterComponent,
    DistictMasterComponent,
    BlockMasterComponent,
    VillageMasterComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MastersModule { }
