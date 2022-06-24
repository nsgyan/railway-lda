import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistictMasterComponent } from './distict-master/distict-master.component';
import { StateMasterComponent } from './state-master/state-master.component';

const routes: Routes = [
  {path:'state',component:StateMasterComponent},
  {path:'district',component:DistictMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
