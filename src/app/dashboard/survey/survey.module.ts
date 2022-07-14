import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';


@NgModule({
  declarations: [
    SurveyListComponent,
    AddSurveyComponent,
    SurveyEditComponent
  ],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SurveyModule { }
