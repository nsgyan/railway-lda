import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-block-master-edit',
  templateUrl: './block-master-edit.component.html',
  styleUrls: ['./block-master-edit.component.css']
})
export class BlockMasterEditComponent implements OnInit {

  block!:FormGroup;
  submitted=false
  state: any;
  district: any;

  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,) {
      this.httpService.getState().subscribe((data:any)=>{
        this.state=data?.state

              })
      this.block=this.fb.group({
        state:['',Validators.required],
        district:['',Validators.required],
        blockName:['',Validators.required],
        blockType:['',Validators.required],


      })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.block);


if(this.block.valid){
  this.httpService.AddBlock({
    state:this.block.value.state,
    district:this.block.value.district,
    block:this.block.value.blockName,
    blockType:this.block.value.blockType,
  }).subscribe((data: any) => {
    this.toast.success(data?.message)
    this.router.navigate(['/dashboard/masters/blockList'])
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


}
}
