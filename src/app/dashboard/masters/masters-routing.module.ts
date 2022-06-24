import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockMasterListComponent } from './block-master-list/block-master-list.component';
import { BlockMasterComponent } from './block-master/block-master.component';
import { DistictMasterComponent } from './distict-master/distict-master.component';
import { DistrictMasterListComponent } from './district-master-list/district-master-list.component';
import { StateMasterListComponent } from './state-master-list/state-master-list.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { VillageMasterListComponent } from './village-master-list/village-master-list.component';
import { VillageMasterComponent } from './village-master/village-master.component';

const routes: Routes = [
  {path:'state',component:StateMasterComponent},
  {path:'stateList',component:StateMasterListComponent},
  {path:'district',component:DistictMasterComponent},
  {path:'districtList',component:DistrictMasterListComponent},
  {path:'block',component:BlockMasterComponent},
  {path:'blockList',component:BlockMasterListComponent},
  {path:'village',component:VillageMasterComponent},
  {path:'villageList',component:VillageMasterListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
