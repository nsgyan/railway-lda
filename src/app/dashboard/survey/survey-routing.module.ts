import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { SurveyEditComponent } from './survey-edit/survey-edit.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

const routes: Routes = [
  {path:'addsurvey',component:AddSurveyComponent},
  {path:'surveyList',component:SurveyListComponent},
  {path:'editSurvey/:id',component:SurveyEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
