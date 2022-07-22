import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bank!:UntypedFormGroup;
  isEdit=false
  submitted=false
  stateData:any
  id:any;
  bankData: any;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getBank().subscribe((data:any)=>{
        this.bankData=data?.bank

              })
      this.bank=this.fb.group({
        bankName:['',Validators.required],
      })
    }

  ngOnInit(): void {

  }


  keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  confirAccount(event:any){
    if(event.target.value!==this.bank.value.accountNo){
      this.bank.get('accountNo')?.setErrors({ confirmAccount: true })
    }

  }
  update(){
    if(this.bank.valid){
      this.httpService.updateBank({
        id:this.id,
        bankName:this.bank.value.bankName,

      }).subscribe((data: any) => {
        // console.log(data);
        this.bank.reset()
        this.toast.success(data?.message)
        // this.toast.showSuccess('State Successfully Added')
        window.location.reload()
      }, err => {
        console.log(err.error);

        this.toast.error(err.error);
      })
    }
    else{
      this.submitted = true;  // this.toast.showSuccess('State Successfully Added')
    }

  }
  onSubmit() {console.log(this.bank);
if(this.bank.valid){
  this.httpService.addBank({
    bankName:this.bank.value.bankName,

  }).subscribe((data: any) => {
    // console.log(data);
    this.bank.reset()
    this.toast.success(data?.message)
    // this.toast.showSuccess('State Successfully Added')
    window.location.reload()
  }, err => {
    console.log(err.error);

    this.toast.error(err.error);
  })
}
else{
  this.submitted = true;  // this.toast.showSuccess('State Successfully Added')
}


  }

  // addState(){
  //   this.router.navigate(['/dashboard/masters/state'])
  // }
  edit(bankData:any){
    this.isEdit= true
this.id=bankData._id
this.bank.get('bankName')?.setValue(bankData.bankName)
this.bank.get('bankName')?.updateValueAndValidity()

  }



  delete(id: any) {
    this.httpService.bankdelete(id).subscribe(res => {
      this.toast.success('Deleted Bank successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }


  cancel() {
    window.location.reload()

}
}
