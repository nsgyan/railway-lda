import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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
  landCategory!:UntypedFormGroup;
  submitted=false
  stateData:any
  isExist=false
  landCategoryData: any;
  id: any;
  constructor( private fb:UntypedFormBuilder,
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

  onUpdate() {console.log(this.landCategory);
    if(this.landCategory.valid){
      this.httpService.updateLandCategory({
        id:this.id,
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
  edit(landData:any){
    this.id= landData._id
    this.isExist= true
    this.landCategory.get('landCategory')?.setValue(landData.landCategory)

    }




    delete(id: any) {
      this.httpService.delsurvey(id).subscribe(res => {
        this.toast.success('deleted survey successfully')
        location.reload()
      }, err => {
        this.toast.error('Internal server error')
      })
    }


  cancel() {
    window.location.reload()

}
}
