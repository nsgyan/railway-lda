import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-block-master-edit',
  templateUrl: './block-master-edit.component.html',
  styleUrls: ['./block-master-edit.component.css']
})
export class BlockMasterEditComponent implements OnInit {

  block!:UntypedFormGroup;
  submitted=false
  state: any;
  district: any;
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
      this.block=this.fb.group({
        state:['',Validators.required],
        district:['',Validators.required],
        blockName:['',Validators.required],
        blockType:['',Validators.required],


      })
      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getBlockById(this.id).subscribe((data:any)=>{
        this.block.get('state')?.setValue(data.block?.state)
        this.block.get('state')?.updateValueAndValidity
        this.block.get('district')?.setValue(data.block?.district)
        this.block.get('district')?.updateValueAndValidity
        this.block.get('blockName')?.setValue(data.block?.block)
        this.block.get('blockName')?.updateValueAndValidity
        this.block.get('blockType')?.setValue(data.block?.blockType)
        this.block.get('blockType')?.updateValueAndValidity

              })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.block);


if(this.block.valid){
  this.httpService.updateblock({
    id:this.id,
    state:this.block.value.state,
    district:this.block.value.district,
    block:this.block.value.blockName,
    blockType:this.block.value.blockType,
  }).subscribe((data: any) => {
    this.toast.success(data?.message)
    this.router.navigate(['/dashboard/masters/block'])
  },(err=>{
    this.toast.error(err.error.message);
  }))
}
else{
  this.submitted = true;
}


  }
  getDistrict(state:any){


    this.httpService.getDistrict(this.block.value.state).subscribe((data:any)=>{
      this.district=data?.district
      console.log(this.district);

            },)
  }



  cancel() {
    this.router.navigate(['/dashboard/masters/block'])

}
}
