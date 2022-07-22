import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-land-nature',
  templateUrl: './land-nature.component.html',
  styleUrls: ['./land-nature.component.css']
})
export class LandNatureComponent implements OnInit {

  landNature!:UntypedFormGroup;
  submitted=false
  isEdit=false
  id:any;
  stateData:any
  landNatureData: any;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getlandNature().subscribe((data:any)=>{
        this.landNatureData=data?.landNature

              })
      this.landNature=this.fb.group({
        landNature:['',Validators.required],
      })
    }

  ngOnInit(): void {

  }


  onUpdate() {console.log(this.landNature);
    if(this.landNature.valid){
      this.httpService.updatelandNature({
        id:this.id,
        landNature:this.landNature.value.landNature,

      }).subscribe((data: any) => {
        // console.log(data);
        this.landNature.reset()
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
  onSubmit() {console.log(this.landNature);
if(this.landNature.valid){
  this.httpService.addlandNature({
    landNature:this.landNature.value.landNature,

  }).subscribe((data: any) => {
    // console.log(data);
    this.landNature.reset()
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
    this.landNature.get('landNature')?.setValue(landData.landNature)
    this.landNature.get('landNature')?.updateValueAndValidity()
    // let url: string = "/dashboard/masters/stateEdit/" + id
    // this.router.navigateByUrl(url);
  }



  delete(id: any) {
    this.httpService.landnaturedelete(id).subscribe(res => {
      this.toast.success('Deleted Land Nature successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }


  cancel() {
    window.location.reload()

}
}
