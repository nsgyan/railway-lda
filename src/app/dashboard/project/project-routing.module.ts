import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';

const routes: Routes = [
  {path:'page',component:ProjectListComponent},
  {path:'add',component:AddProjectComponent},
  {path:'edit/:id',component:ProjectEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
