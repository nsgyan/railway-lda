import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-land-category',
  templateUrl: './land-category.component.html',
  styleUrls: ['./land-category.component.css']
})
export class LandCategoryComponent implements OnInit {
  landCategory!:FormGroup;
  submitted=false
  stateData:any
  landCategoryData: any;
  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getlandCategory().subscribe((data:any)=>{
        this.landCategoryData=data?.LandCategory

              })
      this.landCategory=this.fb.group({
        landCategory:['',Validators.required],
      })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.landCategory);
if(this.landCategory.valid){
  this.httpService.addLandCategory({
    landCategory:this.landCategory.value.landCategory,

  }).subscribe((data: any) => {
    // console.log(data);
    this.landCategory.reset()
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