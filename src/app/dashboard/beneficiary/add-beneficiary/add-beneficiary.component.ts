import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
block:any=[]
village:any=[]
  project:any
  submitted:boolean=false
  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private httpService:HttpsService,
    private toast: ToastrService,) {
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
        projectName:['',Validators.required],
        projectID:['',Validators.required],
        date:['',Validators.required],
        state:['',Validators.required],
        district:['',Validators.required],
        beneficiary:this.fb.array([]) ,

      })


    }

  ngOnInit(): void {
    this.addbeneficiary()
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
      beneficiaryName:['',Validators.required],
      fatherOrHusbandName:['',Validators.required],
      gataNumber:['',Validators.required],
      rakba:['',Validators.required],
      pratifalRate:['',Validators.required],
      beneficaryShare:['',Validators.required],
      // chequeNumber:[''],
      // chequeDate:[''],
      // registrationAmount:[''],
      // remark:['']
    })
  }


  addbeneficiary() {
    this.beneficiarys().push(this.newbeneficiary());
  }
  removebeneficiary(quesIndex:number) {
    this.beneficiarys().removeAt(quesIndex);
    this.village.splice(quesIndex,1)
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
  getBlock(event:any){
    this.block=[]
    this.project.map((item:any)=>{
      if(item.projectName===this.beneficiary.value.projectName){
      item.projectDetails.map((projectData:any)=>{
        if (projectData.state===this.beneficiary.value.state&&projectData.district===this.beneficiary.value.district) {
          if(!this.block.includes(projectData.block)){
        // ✅ only runs if value not in array
          this.block.push(projectData.block);}
        }
      })}
    })
  }

  getVillage(event:any,index:any){
    let newArray: any[]=[]
    const control= this.beneficiary.get("beneficiary") as FormArray
    this.village.splice(index,1)
    console.log(this.beneficiary)
    this.project.map((item:any)=>{
      if(item.projectName===this.beneficiary.value.projectName){
      item.projectDetails.map((projectData:any)=>{
        if (projectData.state===this.beneficiary.value.state&&projectData.district===this.beneficiary.value.district&&projectData.block===control.at(index).value.block) {
          if(!newArray.includes(projectData.village)){
            console.log('hello');
  newArray.push(projectData.village);}
  // console.log(newArray);

        this.village.splice(index, 0, newArray);


        }
      })}
    })
    console.log(this.village);



  }

  onSubmit() {
    // let date=this.beneficiary.value.data.toString()
  console.log(this.beneficiary);
  if(this.beneficiary.valid){
    this.httpService.addBeneficiary({
      projectName:this.beneficiary.value.projectName,
      projectID:this.beneficiary.value.projectID,
      date:this.beneficiary.value.date,
      state:this.beneficiary.value.state,
      district:this.beneficiary.value.district,
      beneficiary:this.beneficiary.value.beneficiary ,

    }).subscribe((data:any)=>{
      this.toast.success(data?.message)
      this.router.navigate(['/dashboard/beneficiariesList'])
    },(err=>{
      this.toast.error(err.error.message);
    }))

  }
  else{
    this.submitted=true
    this.toast.error('Please Fill Required Field');
  }


  }

  cancel() {
    this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])

}
}
