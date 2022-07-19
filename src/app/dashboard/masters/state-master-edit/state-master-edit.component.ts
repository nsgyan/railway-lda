import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-state-master-edit',
  templateUrl: './state-master-edit.component.html',
  styleUrls: ['./state-master-edit.component.css']
})
export class StateMasterEditComponent implements OnInit {
  stateData: any;

  state!:UntypedFormGroup;
  submitted=false
id:any
  constructor( private fb:UntypedFormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private route: ActivatedRoute,) {
   this.id = this.route.snapshot.paramMap.get('id')
   this.state=this.fb.group({
    stateUT:['',Validators.required],
    statetype:['fd',Validators.required],
    stateName:['fddddddd',Validators.required],
    censusCode:['fddddddddd',],
  })
      this.httpService.getstateByID(this.id).subscribe((data:any)=>{
        console.log(data.state);
        if(data.state){
          // console.log(this.stateData);

          this.state.get('censusCode')?.setValue(data.state?.censusCode)
          this.state.get('censusCode')?.updateValueAndValidity
          this.state.get('stateName')?.setValue(data.state?.stateName)
          this.state.get('stateName')?.updateValueAndValidity
          this.state.get('statetype')?.setValue(data.state?.statetype)
          this.state.get('statetype')?.updateValueAndValidity
          this.state.get('stateUT')?.setValue(data.state?.stateUT)
          this.state.get('stateUT')?.updateValueAndValidity
        }
       this.stateData=data
      })
    }
  ngOnInit(): void {
    console.log(this.stateData);
  }

  onSubmit() {console.log(this.state);
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



  cancel() {
    this.router.navigate(['/dashboard/masters/state'])

}
}
