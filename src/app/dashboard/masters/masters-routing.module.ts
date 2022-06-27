import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockMasterEditComponent } from './block-master-edit/block-master-edit.component';
import { BlockMasterListComponent } from './block-master-list/block-master-list.component';
import { BlockMasterComponent } from './block-master/block-master.component';
import { DistictMasterComponent } from './distict-master/distict-master.component';
import { DistricMasterEditComponent } from './distric-master-edit/distric-master-edit.component';
import { DistrictMasterListComponent } from './district-master-list/district-master-list.component';
import { StateMasterEditComponent } from './state-master-edit/state-master-edit.component';
import { StateMasterListComponent } from './state-master-list/state-master-list.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { VillageMasterEditComponent } from './village-master-edit/village-master-edit.component';
import { VillageMasterListComponent } from './village-master-list/village-master-list.component';
import { VillageMasterComponent } from './village-master/village-master.component';

const routes: Routes = [
  {path:'state',component:StateMasterComponent},
  {path:'stateEdit/:id',component:StateMasterEditComponent},
  {path:'stateList',component:StateMasterListComponent},
  {path:'district',component:DistictMasterComponent},
  {path:'districtEdit/:id',component:DistricMasterEditComponent},
  {path:'districtList',component:DistrictMasterListComponent},
  {path:'block',component:BlockMasterComponent},
  {path:'blockEdit/:id',component:BlockMasterEditComponent},
  {path:'blockList',component:BlockMasterListComponent},
  {path:'village',component:VillageMasterComponent},
  {path:'villageEdit/:id',component:VillageMasterEditComponent},
  {path:'villageList',component:VillageMasterListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
