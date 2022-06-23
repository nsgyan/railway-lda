import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StateMasterComponent } from './state-master/state-master.component';

const routes: Routes = [
  {path:'state',component:StateMasterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
