import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpsService } from '../shared/https.service';
import { LocalstorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  login:UntypedFormGroup
  captcha: any;
  submited: boolean=false;
   constructor(private httpService:HttpsService,
     private fb:UntypedFormBuilder,
     private toast:ToastrService,
     private localStorage:LocalstorageService,
     private routes: Router,) {
       this.localStorage.clearLocalStorage()
       this.login= this.fb.group({
         email:['',[Validators.required,Validators.email]],
       })
     }



   ngOnInit(): void {

   }
   checkEmail(event: any) {
    this.httpService.checkEmail({ email: event.target.value }).subscribe((data: any) => {
      console.log(data);

    }, (err: any) => {
      this.login.get('email')?.setErrors({ isExist: true })

    })

  }

   resolved(recaptchaResponse:any){
     this.captcha=recaptchaResponse
   }

   userLogin(){
     // if(this.captcha){
 if(this.login.valid){
 this.httpService.forgotPassword({email:this.login.value.email}).subscribe((data:any)=>{
  //  this.localStorage.set('token',data.refresh_token)
  this.toast.success('Email to send to your email id');
   this.routes.navigate(['/login/sdafds'])

 },err=>{
   this.toast.error('User Not Found');
 })
 }else{
   this.submited = true;
   this.toast.error('Please Fill Required Field');
 }
 //     }
 //     else{

 // this.submited = true;
 //   this.toast.error('Please verify that you are not a robot.');
 //     }
   }




 }
