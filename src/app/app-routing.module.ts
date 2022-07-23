import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormviewComponent } from './formview/formview.component';
import { ListviewComponent } from './listview/listview.component';
import { Listview2Component } from './listview2/listview2.component';
import { Formview2Component } from './formview2/formview2.component';
import { UserComponent } from './user/user.component';
import { AgencyComponentComponent } from './dashboard/system-configuration/agency-component/agency-component.component';
import { DesignationComponent } from './dashboard/system-configuration/designation/designation.component';
import { OfficeComponent } from './dashboard/system-configuration/office/office.component';
import { OfficerComponent } from './dashboard/system-configuration/officer/officer.component';
import { SchemeComponent } from './dashboard/system-configuration/scheme/scheme.component';
import { VendorServiceComponent } from './dashboard/system-configuration/vendor-service/vendor-service.component';
import { VendorTypeComponent } from './dashboard/system-configuration/vendor-type/vendor-type.component';
import { BanksComponent } from './dashboard/system-configuration/banks/banks.component';
import { LimitSettingComponent } from './dashboard/system-configuration/limit-setting/limit-setting.component';
import { AuthGuard } from './shared/auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'changePassword/:id', component: ChangePasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate:[AuthGuard],
    // canActivateChild:[AuthGuard],
    children:[
    {  path: '',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
}
    ]

  },
  // { path: 'list', component: ListviewComponent },
  // { path: 'form', component: FormviewComponent },
  // { path: 'list2', component: Listview2Component },
  // { path: 'form2', component: Formview2Component },
  // { path: 'users', component: UserComponent },
  {
    path: '**',
    redirectTo:''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
