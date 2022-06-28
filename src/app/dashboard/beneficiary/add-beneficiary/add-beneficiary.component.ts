import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.css']
})
export class AddBeneficiaryComponent implements OnInit {
  beneficiary:FormGroup;
state:any=[]
district:any=[]
  project:any
  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private httpService:HttpsService,) {
      this.httpService.getProject().subscribe((data:any)=>{
        this.project=data.projects
        this.project.map((item:any)=>{
          item.projectDetails.map((projectData:any)=>{
            if (!this.state.includes(projectData.state)) {
              // ✅ only runs if value not in array
              this.state.push(projectData.state);
            }
          })



        })

      })
      this.beneficiary=this.fb.group({
        projectName:[''],
        projectID:[''],
        date:[''],
        state:[''],
        district:[''],
        beneficiary:this.fb.array([]) ,

      })


    }

  ngOnInit(): void {
  }


  beneficiarys(): FormArray {
    return this.beneficiary.get("beneficiary") as FormArray
  }
  inputType(): FormArray {
    return this.beneficiary.get("inputType") as FormArray
  }
 get beneficiaryControl(): FormArray {
    return this.beneficiary.get("beneficiary") as FormArray
  }

  newbeneficiary(): FormGroup {
    return this.fb.group({
      block:['',Validators.required],
      village: ['',Validators.required],
      beneficiary:[''],
      beneficiaryName:[''],
      fatherOrHusbandName:[''],
      gataNumber:[''],
      rakba:[''],
      pratifalRate:[''],
      beneficaryShare:[''],
      // chequeNumber:[''],
      // chequeDate:[''],
      // registrationAmount:[''],
      // remark:['']
    })
  }


  addbeneficiary() {
    this.beneficiarys().push(this.newbeneficiary());
  }


  getPriject(event:any){

this.state=[]
this.project.map((item:any)=>{
  if(item.projectName===event.target.value){
    this.beneficiary.get('projectID')?.setValue(item.projectID)
    this.beneficiary.get('projectID')?.updateValueAndValidity
  item.projectDetails.map((projectData:any)=>{
    if (!this.state.includes(projectData.state)) {
      // ✅ only runs if value not in array
      this.state.push(projectData.state);
    }
  })}
  this.beneficiary.get('state')?.reset()
  this.beneficiary.get('state')?.updateValueAndValidity



})


  }

  getDistrict(event:any){
this.district=[]
    this.project.map((item:any)=>{
      if(item.projectName===this.beneficiary.value.projectName){
      item.projectDetails.map((projectData:any)=>{
        if (projectData.state===event.target.value) {
          if(!this.district.includes(projectData.district))


          // ✅ only runs if value not in array
          this.district.push(projectData.district);
        }
      })}



    })


  }

  onSubmit() {
    // let date=this.beneficiary.value.data.toString()
    const beneficiary=[new Beneficiary(
      this.beneficiary.value.date,
      this.beneficiary.value.beneficiaryName,
       this.beneficiary.value.gataNumber,
        this.beneficiary.value.rakba,
        this.beneficiary.value.pratifalRate,
        this.beneficiary.value.beneficaryShare,
         this.beneficiary.value.chequeNumber,
         this.beneficiary.value.chequeDate,
         this.beneficiary.value.registrationAmount)]



         this.data.addBeneficiary(beneficiary)
         this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])

  }

  cancel() {
    this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])

}
}
