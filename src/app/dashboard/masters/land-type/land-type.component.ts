import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-land-type',
  templateUrl: './land-type.component.html',
  styleUrls: ['./land-type.component.css']
})
export class LandTypeComponent implements OnInit {

  landType!:UntypedFormGroup;
  submitted=false
  isExist=false
  id:any
  stateData:any
  landTypeData: any;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getlandType().subscribe((data:any)=>{
        this.landTypeData=data?.landType

              })
      this.landType=this.fb.group({
        landType:['',Validators.required],
      })
    }

  ngOnInit(): void {

  }
  update() {console.log(this.landType);
    if(this.landType.valid){
      this.httpService.updatelandType({
        id:this.id,
        landType:this.landType.value.landType,

      }).subscribe((data: any) => {
        // console.log(data);
        this.landType.reset()
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

  onSubmit() {console.log(this.landType);
if(this.landType.valid){
  this.httpService.addlandType({
    landType:this.landType.value.landType,

  }).subscribe((data: any) => {
    // console.log(data);
    this.landType.reset()
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
  edit(landData:any){
  this.id= landData._id
  this.isExist= true
  this.landType.get('landType')?.setValue(landData.landType)

  }



  delete(id: any) {
    this.httpService.landtypedelete(id).subscribe(res => {
      this.toast.success('Deleted Land Type successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }


  cancel() {
    window.location.reload()

}
}
