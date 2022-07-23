import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpsService } from '../shared/https.service';
import { LocalstorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  [x: string]: any;
  login:UntypedFormGroup
  token:any
   constructor(private httpService:HttpsService,
     private fb:UntypedFormBuilder,
     private toster:ToastrService,
     private localStorage:LocalstorageService,
     private routes: Router,
     private route:ActivatedRoute) {
      this.token=this.route.snapshot.paramMap.get('id')

       this.localStorage.clearLocalStorage()
       this.login= this.fb.group({
        password:['',Validators.required],
        confirmPassword:['',Validators.required]
       })
     }

     conformAccountNumber(event: any,) {
      this.login.get('confirmPassword')?.clearAsyncValidators()
      this.login.get('confirmPassword')?.updateValueAndValidity
      if (event.target.value !== this.login.value.password) {
        this.login.get('confirmPassword')?.setErrors({ confirmPassword: true })
      }
      else {
        // const email = event.target.value ? event.target.value.toLowerCase() : this.beneficiary.get('email')?.value
        // if (email) {
        //   this.httpService.checkEmail({ email: email })
        //     .subscribe((data: any) => {
        //       if (email === data?.email) {
        //         this.beneficiary.get('email')?.setErrors({ isExist: true });
        //       }

        //     })

        // }

      }
    }


   ngOnInit(): void {

   }
   resolved(recaptchaResponse:any){
     this.captcha=recaptchaResponse
   }

   userLogin(){
     // if(this.captcha){
 if(this.login.valid){
 this.httpService.changePassword({password:this.login.value.password},this.token).subscribe((data:any)=>{

  this.toster.success(data.msg);
   this.routes.navigate(['/login/sdafds'])

 },err=>{
   this.toast.error('User Not Found');
 })
 }else{
   this.submited = true;
   this.toster.error('Please Fill Required Field');
 }
 //     }
 //     else{

 // this.submited = true;
 //   this.toast.error('Please verify that you are not a robot.');
 //     }
   }




 }
