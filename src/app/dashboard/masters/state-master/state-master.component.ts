import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  state!:FormGroup;
  submitted=false
  stateData:any
  constructor( private fb:FormBuilder,
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
        censusCode:['',Validators.required],


      })
    }

  ngOnInit(): void {

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
  edit(id:any){
    let url: string = "/dashboard/masters/stateEdit/" + id
    this.router.navigateByUrl(url);
  }






  cancel() {
    window.location.reload()

}
}
