import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  state!:UntypedFormGroup;
  submitted=false
  isEdit= false
  stateData:any
  id: any;
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getState().subscribe((data:any)=>{
        this.stateData=data?.state

              })
      this.state=this.fb.group({
        stateUT:['',Validators.required],
        statetype:['',Validators.required],
        stateName:['',Validators.required],
        censusCode:[''],


      })
    }

  ngOnInit(): void {

  }
  onUpdate() {console.log(this.state);
    if(this.state.valid){
      this.httpService.updateState({
        id:this.id,
        stateUT:this.state.value.stateUT,
        statetype:this.state.value.statetype,
        stateName:this.state.value.stateName,
        censusCode:this.state.value.censusCode,
      }).subscribe((data: any) => {
        // console.log(data);
        this.toast.success(data?.message)
        window.location.reload()
        // this.toast.showSuccess('State Successfully Added')
        this.router.navigate(['/dashboard/masters/state'])
      }, err => {
        console.log(err.error);

        this.toast.error(err.error);
      })
    }
    else{
      this.submitted = true;  // this.toast.showSuccess('State Successfully Added')
    }


      }

  onSubmit() {console.log(this.state);
if(this.state.valid){
  this.httpService.AddState({
    stateUT:this.state.value.stateUT,
    statetype:this.state.value.statetype,
    stateName:this.state.value.stateName,
    censusCode:this.state.value.censusCode,
  }).subscribe((data: any) => {
    // console.log(data);
    this.state.reset()
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
  edit(stateData:any){
    this.id=stateData._id
    this.isEdit= true

    this.state.get('stateUT')?.setValue(stateData.stateUT)
    this.state.get('stateUT')?.updateValueAndValidity()
    this.state.get('statetype')?.setValue(stateData.statetype)
    this.state.get('statetype')?.updateValueAndValidity()
    this.state.get('stateName')?.setValue(stateData.stateName)
    this.state.get('stateName')?.updateValueAndValidity()
    this.state.get('censusCode')?.setValue(stateData.censusCode)
    this.state.get('censusCode')?.updateValueAndValidity()
    // let url: string = "/dashboard/masters/stateEdit/" + id
    // this.router.navigateByUrl(url);
  }


  delete(id: any) {
    this.httpService.statedelete(id).subscribe(res => {
      this.toast.success(' State deleted successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }



  cancel() {
    window.location.reload()

}
}
