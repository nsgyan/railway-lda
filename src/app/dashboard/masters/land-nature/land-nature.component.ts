import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  landNature!:FormGroup;
  submitted=false
  stateData:any
  landNatureData: any;
  constructor( private fb:FormBuilder,
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
  edit(id:any){
    let url: string = "/dashboard/masters/stateEdit/" + id
    this.router.navigateByUrl(url);
  }






  cancel() {
    window.location.reload()

}
}
