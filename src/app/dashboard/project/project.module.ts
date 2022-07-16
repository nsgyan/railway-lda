import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectEditComponent } from './project-edit/project-edit.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    AddProjectComponent,
    ProjectEditComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
