import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { StateMasterComponent } from './state-master/state-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DistictMasterComponent } from './distict-master/distict-master.component';
import { BlockMasterComponent } from './block-master/block-master.component';
import { VillageMasterComponent } from './village-master/village-master.component';
import { BlockMasterListComponent } from './block-master-list/block-master-list.component';
import { VillageMasterListComponent } from './village-master-list/village-master-list.component';
import { StateMasterListComponent } from './state-master-list/state-master-list.component';
import { DistrictMasterListComponent } from './district-master-list/district-master-list.component';
import { BlockMasterEditComponent } from './block-master-edit/block-master-edit.component';
import { StateMasterEditComponent } from './state-master-edit/state-master-edit.component';
import { DistricMasterEditComponent } from './distric-master-edit/distric-master-edit.component';
import { VillageMasterEditComponent } from './village-master-edit/village-master-edit.component';


@NgModule({
  declarations: [
    StateMasterComponent,
    DistictMasterComponent,
    BlockMasterComponent,
    VillageMasterComponent,
    BlockMasterListComponent,
    VillageMasterListComponent,
    StateMasterListComponent,
    DistrictMasterListComponent,
    BlockMasterEditComponent,
    StateMasterEditComponent,
    DistricMasterEditComponent,
    VillageMasterEditComponent
  ],
  imports: [
    CommonModule,
    MastersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MastersModule { }
