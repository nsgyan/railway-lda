import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-village-master-edit',
  templateUrl: './village-master-edit.component.html',
  styleUrls: ['./village-master-edit.component.css']
})
export class VillageMasterEditComponent implements OnInit {
  village!:UntypedFormGroup;
  submitted=false
  state: any;
  district: any;
  block: any;
  id:any
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private route: ActivatedRoute,) {
      this.httpService.getState().subscribe((data:any)=>{
        this.state=data?.state

              })
      this.village=this.fb.group({
        state:['',Validators.required],
        district:['',Validators.required],
        village:['',Validators.required],
        block:['',Validators.required],


      })
      this.id = this.route.snapshot.paramMap.get('id')
      console.log(this.id,'id');

      this.httpService.getVillageByID(this.id).subscribe((data:any)=>{
        this.village.get('state')?.setValue(data.village?.state)
        this.village.get('state')?.updateValueAndValidity
        this.village.get('district')?.setValue(data.village?.district)
        this.village.get('district')?.updateValueAndValidity
        this.village.get('block')?.setValue(data.village?.block)
        this.village.get('block')?.updateValueAndValidity
        this.village.get('village')?.setValue(data.village?.village)
        this.village.get('village')?.updateValueAndValidity
              })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.village);


if(this.village.valid){
  this.httpService.updateVillage({
  id:this.id,
    state:this.village.value.state,
    district:this.village.value.district,
    village: this.village.value.village,
    block:this.village.value.block,
  }).subscribe((data: any) => {
    this.toast.success(data?.message)
    this.router.navigate(['/dashboard/masters/village'])
  }, (err => {
    this.toast.error(err.error.message);
  }))
}
else{
  this.submitted = true;
}


  }
  getDistrict(state:any){
    console.log(state);
    console.log(this.village.value.state);

    this.httpService.getDistrict(this.village.value.state).subscribe((data:any)=>{
      this.district=data?.district

            })
  }
  getblock(state:any){
    console.log(state);
    console.log(this.village.value.state);

    this.httpService.getBlock(this.village.value.state,this.village.value.district).subscribe((data:any)=>{
      this.block=data?.blocks

            })
  }




  cancel() {
    this.router.navigate(['/dashboard/masters/village'])

}
}
