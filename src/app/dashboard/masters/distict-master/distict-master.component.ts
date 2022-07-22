import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-distict-master',
  templateUrl: './distict-master.component.html',
  styleUrls: ['./distict-master.component.css']
})
export class DistictMasterComponent implements OnInit {
  district!:UntypedFormGroup;
  submitted=false
state:any
  districtData: any;
  id: any;
  isEdit: boolean = false;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService) {
      this.httpService.getState().subscribe((data:any)=>{
this.state=data?.state

      })
      this.district=this.fb.group({
      state:['',Validators.required],
        district:['',Validators.required],


      })
    }

  ngOnInit(): void {
    this.getDistrict()

  }

  onSubmit() {console.log(this.district);
if(this.district.valid){
  this.httpService.AddDistrict({
    district:this.district.value.district,
    state:this.district.value.state,

  }).subscribe((data: any) => {
    this.toast.success(data?.message)
    this.district.reset()
    window.location.reload()
    // this.toast.showSuccess('State Successfully Added')
    this.router.navigate(['/dashboard/masters/district'])

  }, err => {
    this.toast.error(err.error.message);
  })
}
else{
  this.submitted = true;
}


  }


  onUpdate() {
    console.log(this.district);
    if (this.district.valid) {
      this.httpService.updatedistrict({
        id: this.id,
        district: this.district.value.district,
        state: this.district.value.state,

      }).subscribe((data: any) => {
        this.toast.success(data?.message)
        window.location.reload()
        // this.toast.showSuccess('State Successfully Added')
        this.router.navigate(['/dashboard/masters/district'])

      }, err => {
        this.toast.error(err.error.message);
      })
    }
    else {
      this.submitted = true;
    }


  }


  getDistrict(){


    this.httpService.districtList().subscribe((data:any)=>{
      this.districtData=data?.district

            })
  }


  cancel() {
    window.location.reload()


}
  edit(stateData: any) {
    this.id = stateData._id
    this.isEdit = true

    // id:this.id,
    // district:this.district.value.district,
    // state:this.district.value.state,
    this.district.get('district')?.setValue(stateData.district)
    this.district.get('district')?.updateValueAndValidity()
    this.district.get('state')?.setValue(stateData.state)
    this.district.get('state')?.updateValueAndValidity()

  // let url: string = "/dashboard/masters/stateEdit/" + id
  // this.router.navigateByUrl(url);
}
delete(id: any) {
  this.httpService.districtdelete(id).subscribe(res => {
    this.toast.success('deleted District successfully')
    location.reload()
  }, err => {
    this.toast.error('Internal server error')
  })
}


}
