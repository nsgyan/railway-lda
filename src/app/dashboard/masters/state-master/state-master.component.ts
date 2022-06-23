import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DataService } from 'src/app/shared/data.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-state-master',
  templateUrl: './state-master.component.html',
  styleUrls: ['./state-master.component.css']
})
export class StateMasterComponent implements OnInit {
  state!:FormGroup;


  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
      this.state=this.fb.group({
        stateUT:['',Validators.required],
        statetype:['',Validators.required],
        stateName:['',Validators.required],
      })
    }

  ngOnInit(): void {
    this.addselectDistrict()
  }

  onSubmit() {console.log(this.state);



  }
  SelectDistrict(): FormArray {
    return this.state.get("selectDistrict") as FormArray
  }
  inputType(): FormArray {
    return this.state.get("inputType") as FormArray
  }
 get selectDistrict(): FormArray {
    return this.state.get("selectDistrict") as FormArray
  }

  newSelectDistrict(): FormGroup {
    return this.fb.group({
      district: ['',Validators.required],
      area:['',Validators.required],
      location: ['',Validators.required],
      Remark:['',Validators.required],
    })
  }


  addselectDistrict() {
    this.SelectDistrict().push(this.newSelectDistrict());
  }


  removeSelectDistrict(quesIndex:number) {
    this.SelectDistrict().removeAt(quesIndex);
  }


  cancel() {
    this.router.navigate(['/dashboard/state/beneficiariesList'])

}
}
