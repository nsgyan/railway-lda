import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
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

  block!:UntypedFormGroup;
  submitted=false
  isEdit=false
  state: any;
  district: any;
  blockData:any
  id: any;
  constructor( private fb:UntypedFormBuilder,
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
  onUpdate() {
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


  edit(blockData:any){
    this.id=blockData._id
    this.isEdit= true

    this.block.get('state')?.setValue(blockData.state)
    this.block.get('state')?.updateValueAndValidity()
    this.block.get('blockType')?.setValue(blockData.blockType)
    this.block.get('blockType')?.updateValueAndValidity()
    this.block.get('blockName')?.setValue(blockData.block)
    this.block.get('blockName')?.updateValueAndValidity()
    this.block.get('district')?.setValue(blockData.district)
    this.block.get('district')?.updateValueAndValidity()
    // let url: string = "/dashboard/masters/blockEdit/" + id
    // this.router.navigateByUrl(url);
  }
  delete(id: any) {
    this.httpService.blockdelete(id).subscribe(res => {
      this.toast.success('Block deleted  successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }

  cancel() {
    this.block.reset()
    window.location.reload()
    // this.router.navigate(['/dashboard/masters/block'])
  }
}
