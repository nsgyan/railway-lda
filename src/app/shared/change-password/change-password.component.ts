import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { panValidation } from '../custom-validation.service';
import { HttpsService } from '../https.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePassword:FormGroup;
  state:any=[]
  district:any=[]
  block:any=[]


  village:any=[]
  project:any
     submitted:boolean=false
    bankData: any

   constructor( private fb:FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
      private router: Router,
      private httpService:HttpsService,
      private toast: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: any) {



        // data.map((item:any)=>{

        // })
      //   this.httpService.getBank().subscribe((data:any)=>{
      //     this.bankData=data?.bank

      //           })
      // this.httpService.getState().subscribe((data: any) => {
      //   data?.state.map((item: any) => {
      //     this.state.push(item.stateName)
      //   })

      // })


        this.changePassword=this.fb.group({
          oldPassword: ['', Validators.required],
          password:['',Validators.required],
          confirmPassword: ['', [Validators.required]],


        })


      }

    ngOnInit(): void {

    }








    onSubmit() {
      // let date=this.changePassword.value.data.toString()

    console.log(this.changePassword);
    if(this.changePassword.valid){
      this.httpService.changePass({
        oldPassword: this.changePassword.value.oldPassword,
        password: this.changePassword.value.password,
        confirmPassword: this.changePassword.value.confirmPassword,

      }).subscribe((data:any)=>{
        this.toast.success('Password change successfully ')
        this.dialogRef.close();
        // this.router.navigate(['/dashboard/changePassword/beneficiariesList'])
      },((err: { error: { message: string | undefined; }; })=>{
        this.toast.error(err.error.message);
      }))
      this.changePassword.get('conformAccountNumber')?.setErrors({ conformAccountNumber: true })
    }
    else{
      this.submitted=true
      this.toast.error('Please Fill Required Field');
    }


    }

    keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
      // const charCode = (event.which) ? event.which : event.keyCode;
    //  return (charCode >= 48 && charCode <= 57) ||charCode == 46 || charCode == 0
      const charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode >= 48 && charCode <= 57)  || charCode == 0) {
        return true;}
      // }else if((charCode < 48 || charCode > 57)){
      //   event.preventDefault();
      //   return false;
      // }
      else {
        event.preventDefault();
          return false;
      }
    }

    keyPresschar(evt: any) {
      evt = (evt) ? evt : event;
      const charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
        ((evt.which) ? evt.which : 0));
      if (charCode < 31 && (charCode > 65 || charCode < 90) &&
        (charCode > 97 || charCode < 122)) {
          return false;

      }
      return true;
    }


    cancel() {
      this.dialogRef.close();
      // this.router.navigate(['/dashboard/changePassword/beneficiariesList'])

  }
  }

