import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  objectionType!:FormGroup;
  submitted=false
  stateData:any
  objectionTypeData: any;
  constructor( private fb:FormBuilder,
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
  edit(id:any){
    let url: string = "/dashboard/masters/stateEdit/" + id
    this.router.navigateByUrl(url);
  }






  cancel() {
    window.location.reload()

}
}

