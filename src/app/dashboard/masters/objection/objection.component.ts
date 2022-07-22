import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-objection',
  templateUrl: './objection.component.html',
  styleUrls: ['./objection.component.css']
})
export class ObjectionComponent implements OnInit {
  isEdit=false
  objectionType!:UntypedFormGroup;
  submitted=false
  stateData:any
  objectionTypeData: any;
  id: any;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getobjectionType().subscribe((data:any)=>{
        this.objectionTypeData=data?.objectionType

              })
      this.objectionType=this.fb.group({
        objectionType:['',Validators.required],
      })
    }

  ngOnInit(): void {

  }
  onUpdate() {console.log(this.objectionType);
    if(this.objectionType.valid){
      this.httpService.updateobjectionType({
        id:this.id,
        objectionType:this.objectionType.value.objectionType,

      }).subscribe((data: any) => {
        // console.log(data);
        this.objectionType.reset()
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

  onSubmit() {console.log(this.objectionType);
if(this.objectionType.valid){
  this.httpService.addobjectionType({
    objectionType:this.objectionType.value.objectionType,

  }).subscribe((data: any) => {
    // console.log(data);
    this.objectionType.reset()
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
    this.id=landData._id
    this.isEdit= true
    this.objectionType.get('objectionType')?.setValue(landData.objectionType)
    this.objectionType.get('objectionType')?.updateValueAndValidity()
    // let url: string = "/dashboard/masters/stateEdit/" + id
    // this.router.navigateByUrl(url);
  }



  delete(id: any) {
    this.httpService.objectiontypedelete(id).subscribe(res => {
      this.toast.success('Deleted Objection Type successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }

  cancel() {
    window.location.reload()

}
}

