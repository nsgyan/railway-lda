import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddserwayComponent } from './addserway/addserway.component';
import { SerwayListComponent } from './serway-list/serway-list.component';

const routes: Routes = [
  {
    path: 'serwayList',
    component:SerwayListComponent
  },
  {
    path: 'addserway',
    component:AddserwayComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerwayRoutingModule { }
