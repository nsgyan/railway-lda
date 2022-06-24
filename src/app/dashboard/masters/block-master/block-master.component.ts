import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
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
  }).subscribe(data=>{
    console.log(data);
    this.router.navigate(['/dashboard/masters/blockList'])
  },(err=>{
    this.toster.error('fdsssssss')
  }))
}
else{
  this.submitted = true;
}


  }
  getDistrict(state:any){
    console.log(state);
    console.log(this.block.value.state);

    this.httpService.getDistrict(this.block.value.state).subscribe((data:any)=>{
      this.district=data?.district

            },)
  }



  cancel() {


}
}
