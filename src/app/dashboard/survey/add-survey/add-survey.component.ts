import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {

  survey:FormGroup;
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
            item.acquisitionDetails?.map((projectData:any)=>{
              if (!this.state.includes(projectData.state)) {
                // ✅ only runs if value not in array
                this.state.push(projectData.state);
              }
            })



          })

        })
        this.survey=this.fb.group({
          projectName:['',Validators.required],
          projectNumber:['',Validators.required],
          date:['',Validators.required],
          state:['',Validators.required],
          district:['',Validators.required],
          surveyDetails:fb.array([]) ,

        })


      }

    ngOnInit(): void {
      this.addsurvey()
    }


    surveys(): FormArray {
      return this.survey.get("surveyDetails") as FormArray
    }
    inputType(): FormArray {
      return this.survey.get("inputType") as FormArray
    }
   get surveyControl(): FormArray {
      return this.survey.get("surveyDetails") as FormArray
    }

    newsurvey(): FormGroup {
      return this.fb.group({
        block:['',Validators.required],
        village: ['',Validators.required],
        surveyName:['',Validators.required],
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


    addsurvey() {
      this.surveys().push(this.newsurvey());
    }
    removesurvey(quesIndex:number) {
      this.surveys().removeAt(quesIndex);
      this.village.splice(quesIndex,1)
    }


    getPriject(event:any){

  this.state=[]
  this.project.map((item:any)=>{
    if(item.projectName===event.target.value){
      this.survey.get('projectNumber')?.setValue(item.projectNumber)
      this.survey.get('projectNumber')?.updateValueAndValidity
    item.acquisitionDetails?.map((projectData:any)=>{
      if (!this.state.includes(projectData.state)) {
        // ✅ only runs if value not in array
        this.state.push(projectData.state);
      }
    })}
    this.survey.get('state')?.reset()
    this.survey.get('state')?.updateValueAndValidity



  })


    }

    getDistrict(event:any){
  this.district=[]

      this.project.map((item:any)=>{
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
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
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
          if (projectData.state===this.survey.value.state&&projectData.district===this.survey.value.district) {
            if(!this.block.includes(projectData.block)){
          // ✅ only runs if value not in array
            this.block.push(projectData.block);}
          }
        })}
      })
    }

    getVillage(event:any,index:any){
      let newArray: any[]=[]
      const control= this.survey.get("survey") as FormArray
      this.village.splice(index,1)
      console.log(this.survey)
      this.project.map((item:any)=>{
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
          if (projectData.state===this.survey.value.state&&projectData.district===this.survey.value.district&&projectData.block===control.at(index).value.block) {
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
      // let date=this.survey.value.data.toString()
    console.log(this.survey);
    if(this.survey.valid){
      this.httpService.addBeneficiary({
        projectName:this.survey.value.projectName,
        projectNumber:this.survey.value.projectNumber,
        date:this.survey.value.date,
        state:this.survey.value.state,
        district:this.survey.value.district,
        survey:this.survey.value.survey ,

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
      this.router.navigate(['/dashboard/survey/beneficiariesList'])

  }
  }

