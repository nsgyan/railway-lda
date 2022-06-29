import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-block-master',
  templateUrl: './block-master.component.html',
  styleUrls: ['./block-master.component.css']
})
export class BlockMasterComponent implements OnInit {

  block!:FormGroup;
  submitted=false
  state: any;
  district: any;
  blockData:any
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
this.getblock()
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
    // this.router.navigate(['/dashboard/masters/block'])
    this.block.reset()
    window.location.reload()
  },(err=>{
    this.toast.error(err.error.message);
  }))
}
else{
  this.submitted = true;
}


  }
  getDistrict(state:any){
this.block.get('district')?.reset()
this.block.get('district')?.updateValueAndValidity()

    this.httpService.getDistrict(this.block.value.state).subscribe((data:any)=>{
      this.district=data?.district
      console.log(this.district);

            },)
  }


  getblock(){


    this.httpService.blocksList().subscribe((data:any)=>{
      this.blockData=data?.blocks

            })
  }


  edit(id:any){
    let url: string = "/dashboard/masters/blockEdit/" + id
    this.router.navigateByUrl(url);
  }

  cancel() {
    this.block.reset()
    window.location.reload()
    // this.router.navigate(['/dashboard/masters/block'])
  }
}
