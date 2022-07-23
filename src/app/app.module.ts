import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListviewComponent } from './listview/listview.component';
import { FormviewComponent } from './formview/formview.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Listview2Component } from './listview2/listview2.component';
import { Formview2Component } from './formview2/formview2.component';
import { UserComponent } from './user/user.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { ApiHandlerInterceptor } from './shared/api-handler.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    DashboardComponent,
    ListviewComponent,
    FormviewComponent,
    HeaderComponent,
    SidenavComponent,
    Listview2Component,
    Formview2Component,
    UserComponent,
    ForgetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi:true
  },
{
  provide:HTTP_INTERCEPTORS,
  useClass:ApiHandlerInterceptor,
  multi:true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
