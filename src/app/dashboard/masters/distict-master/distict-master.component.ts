import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
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
  district!:FormGroup;
  submitted=false
state:any
  districtData: any;
  constructor( private fb:FormBuilder,
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



  getDistrict(){


    this.httpService.districtList().subscribe((data:any)=>{
      this.districtData=data?.district

            })
  }


  cancel() {
    window.location.reload()


}
edit(id:any){
  let url: string = "/dashboard/masters/districtEdit/" + id
  this.router.navigateByUrl(url);
}

}
