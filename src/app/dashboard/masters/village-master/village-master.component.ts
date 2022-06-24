import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-village-master',
  templateUrl: './village-master.component.html',
  styleUrls: ['./village-master.component.css']
})
export class VillageMasterComponent implements OnInit {
  village!:FormGroup;
  submitted=false
  state: any;
  district: any;
  block: any;

  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
      this.httpService.getState().subscribe((data:any)=>{
        this.state=data?.state

              })
      this.village=this.fb.group({
        state:['',Validators.required],
        district:['',Validators.required],
        village:['',Validators.required],
        block:['',Validators.required],


      })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.village);


if(this.village.valid){
  this.httpService.addVillage({
    state:this.village.value.state,
    district:this.village.value.district,
    village:this.village.value.villageName,
    block:this.village.value.block,
  }).subscribe(data=>{
    console.log(data);

  })
}
else{
  this.submitted = true;
}


  }
  getDistrict(state:any){
    console.log(state);
    console.log(this.village.value.state);

    this.httpService.getDistrict(this.village.value.state).subscribe((data:any)=>{
      this.district=data?.district

            })
  }
  getblock(state:any){
    console.log(state);
    console.log(this.village.value.state);

    this.httpService.getBlock(this.village.value.state,this.village.value.district).subscribe((data:any)=>{
      this.block=data?.blocks

            })
  }




  cancel() {
    this.router.navigate(['/dashboard/village/beneficiariesList'])

}
}
