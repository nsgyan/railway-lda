import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-distric-master-edit',
  templateUrl: './distric-master-edit.component.html',
  styleUrls: ['./distric-master-edit.component.css']
})
export class DistricMasterEditComponent implements OnInit {
  district!:UntypedFormGroup;
  submitted=false
state:any
  id: any;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private route: ActivatedRoute,) {
      this.httpService.getState().subscribe((data:any)=>{
        this.state=data?.state

              })
              this.district=this.fb.group({
                state:['',Validators.required],
                  district:['',Validators.required],


                })
      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getDistrictById(this.id).subscribe((data:any)=>{
// this.state=data?.state
this.district.get('state')?.setValue(data.district?.state)
this.district.get('state')?.updateValueAndValidity
this.district.get('district')?.setValue(data.district?.district)
this.district.get('district')?.updateValueAndValidity


      })

    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.district);
if(this.district.valid){
  this.httpService.updatedistrict({
    id:this.id,
    district:this.district.value.district,
    state:this.district.value.state,

  }).subscribe((data: any) => {
    this.toast.success(data?.message)
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




  cancel() {
    this.router.navigate(['/dashboard/masters/district'])

}
}
