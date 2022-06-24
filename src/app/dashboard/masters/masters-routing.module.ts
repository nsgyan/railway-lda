import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockMasterComponent } from './block-master/block-master.component';
import { DistictMasterComponent } from './distict-master/distict-master.component';
import { StateMasterComponent } from './state-master/state-master.component';
import { VillageMasterComponent } from './village-master/village-master.component';

const routes: Routes = [
  {path:'state',component:StateMasterComponent},
  {path:'district',component:DistictMasterComponent},
  {path:'block',component:BlockMasterComponent},
  {path:'village',component:VillageMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
