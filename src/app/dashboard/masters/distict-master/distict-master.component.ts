import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-distict-master',
  templateUrl: './distict-master.component.html',
  styleUrls: ['./distict-master.component.css']
})
export class DistictMasterComponent implements OnInit {
  district!:FormGroup;
  submitted=false
state:any
  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
      this.httpService.getState().subscribe((data:any)=>{
this.state=data?.state

      })
      this.district=this.fb.group({
      state:['',Validators.required],
        district:['',Validators.required],


      })
    }

  ngOnInit(): void {

  }

  onSubmit() {console.log(this.district);
if(this.district.valid){
  this.httpService.AddDistrict({
    district:this.district.value.district,
    state:this.district.value.state,

  }).subscribe(data=>{
    console.log(data);

  })
}
else{
  this.submitted = true;
}


  }




  cancel() {
    this.router.navigate(['/dashboard/district/beneficiariesList'])

}
}
