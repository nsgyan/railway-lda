import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpsService } from '../shared/https.service';
import { LocalstorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  [x: string]: any;
 login:UntypedFormGroup
  constructor(private httpService:HttpsService,
    private fb:UntypedFormBuilder,
    private toster:ToastrService,
    private localStorage:LocalstorageService,
    private routes: Router,) {
      this.localStorage.clearLocalStorage()
      this.login= this.fb.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
      })
    }



  ngOnInit(): void {

  }
  resolved(recaptchaResponse:any){
    this.captcha=recaptchaResponse
  }

  userLogin(){
    // if(this.captcha){
if(this.login.valid){
this.httpService.login({email:this.login.value.email,password:this.login.value.password}).subscribe((data:any)=>{
  this.localStorage.set('token',data.refresh_token)
  this.routes.navigate(['dashboard/page'])

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
