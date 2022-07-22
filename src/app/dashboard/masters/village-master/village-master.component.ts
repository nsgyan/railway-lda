import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-village-master',
  templateUrl: './village-master.component.html',
  styleUrls: ['./village-master.component.css']
})
export class VillageMasterComponent implements OnInit {
  village!:UntypedFormGroup;
  submitted=false
  state: any;
  district: any;
  block: any;
  villageData: any;
  id: any
  isEdit = false

  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.village().subscribe((data:any)=>{
        this.villageData=data?.village

              })
      this.httpService.getState().subscribe((data:any)=>{
        this.state=data?.state

              })
      this.village=this.fb.group({
        state:['',Validators.required],
        district:['',Validators.required],
        village:['',Validators.required],
        block:['',Validators.required],


      })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.village);


if(this.village.valid){
  this.httpService.addVillage({
    state:this.village.value.state,
    district:this.village.value.district,
    village: this.village.value.village,
    block:this.village.value.block,
  }).subscribe((data: any) => {
    this.toast.success(data?.message)
    this.village.reset()
    window.location.reload()
  }, (err => {
    this.toast.error(err.error.message);
  }))
}
else{
  this.submitted = true;
}


  }

  onUpdate() {
    console.log(this.village);


    if (this.village.valid) {
      this.httpService.updateVillage({
        id: this.id,
        state: this.village.value.state,
        district: this.village.value.district,
        village: this.village.value.village,
        block: this.village.value.block,
      }).subscribe((data: any) => {
        this.toast.success(data?.message)
        window.location.reload()
        this.router.navigate(['/dashboard/masters/village'])
      }, (err => {
        this.toast.error(err.error.message);
      }))
    }
    else {
      this.submitted = true;
    }


  }

  getDistrict(state:any){
    this.village.get('district')?.reset()
    this.village.get('district')?.updateValueAndValidity()
    this.village.get('block')?.reset()
    this.village.get('block')?.updateValueAndValidity()

    this.httpService.getDistrict(this.village.value.state).subscribe((data:any)=>{
      this.district=data?.district

            })
  }
  getblock(state:any){
    this.village.get('block')?.reset()
    this.village.get('block')?.updateValueAndValidity()

    this.httpService.getBlock(this.village.value.state,this.village.value.district).subscribe((data:any)=>{
      this.block=data?.blocks

            })
  }




  cancel() {
    window.location.reload()
}


// addvillage(){
//   this.router.navigate(['/dashboard/masters/village'])
// }
delete(id: any) {
  this.httpService.villagedelete(id).subscribe(res => {
    this.toast.success('Village deleted  successfully')
    location.reload()
  }, err => {
    this.toast.error('Internal server error')
  })
}


  edit(villageData: any) {
    this.id = villageData._id
    this.isEdit = true


    this.village.get('state')?.setValue(villageData.state)
    this.village.get('state')?.updateValueAndValidity()
    this.village.get('village')?.setValue(villageData.village)
    this.village.get('village')?.updateValueAndValidity()
    this.village.get('block')?.setValue(villageData.block)
    this.village.get('block')?.updateValueAndValidity()
    this.village.get('district')?.setValue(villageData.district)
    this.village.get('district')?.updateValueAndValidity()
  // let url: string = "/dashboard/masters/villageEdit/" + id
  // this.router.navigateByUrl(url);
}


}
