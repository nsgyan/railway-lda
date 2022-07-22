
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  survey:UntypedFormGroup;
   day = new Date()
  state:any=[]
  district:any=[]
  block:any=[]
  village:any=[]
  landType:any=[]
  landNature:any=[]
  landCategory:any=[]
  objectionType:any=[]
    project:any
    submitted:boolean=false
  filename: any;
  pipe = new DatePipe('en-US');
  todayDate: any;
    constructor( private fb:UntypedFormBuilder,
      private router: Router,
      private data: DataService,
      private httpService:HttpsService,
      private toast: ToastrService,
      ) {
        this.httpService.getlandNature().subscribe((data:any)=>{
          this.landNature=data?.landNature

                })
        this.httpService.getlandCategory().subscribe((data:any)=>{
          this.landCategory=data?.LandCategory

                })
                this.httpService.getlandType().subscribe((data:any)=>{
                  this.landType=data?.landType

                        })
        this.httpService.getProject().subscribe((data:any)=>{
          this.project=data.projects


        })
        this.survey=this.fb.group({
          projectName:['',Validators.required],
          projectNumber:['',Validators.required],
          date:['',Validators.required],
          surveyNumber:['',Validators.required],
          surveyDetail:this.fb.array([]) ,
          document:['',Validators.required],
         state:['',Validators.required],
         district:['',Validators.required],

        })


      }

    ngOnInit(): void {
      this.addsurvey()
      this.state=[]
      this.todayDate=this.pipe.transform(new Date(), 'yyyy-MM-dd');
      console.log( this.todayDate);

    }


    surveys(): UntypedFormArray {
      return this.survey.get("surveyDetail") as UntypedFormArray
    }
    inputType(): UntypedFormArray {
      return this.survey.get("inputType") as UntypedFormArray
    }
   get surveyControl(): UntypedFormArray {
      return this.survey.get("surveyDetail") as UntypedFormArray
    }

    newsurvey(): UntypedFormGroup {
      return this.fb.group({

        block:['',Validators.required],
        village: ['',Validators.required],
        area:['',Validators.required],
        totalArea:['',Validators.required],
        amount:['',Validators.required],
        beneficiaryCount:['',Validators.required],
        landType:['',Validators.required],
        landNature:['',Validators.required],
        landCategory:['',Validators.required],
        objecton:['',Validators.required],
        objectionType:[''],
        document:['',Validators.required],

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
    getBeneficiaryCount(event:any,index:any){
     const control= this.survey.get("surveyDetail") as UntypedFormArray
this.httpService.getCountBeneficiary({state:this.survey.value.state,
  district:this.survey.value.district,
  block:control.at(index).value.block,
  village:control.at(index).value.village
}).subscribe((data:any)=>{
  console.log(data);
  control.at(index).get('beneficiaryCount')?.setValue(data.count)
  control.at(index).get('beneficiaryCount')?.updateValueAndValidity()

})
    }
    changeListener($event: any, index: any,type:any) {
      let file = $event.target.files;



      if (
        file[0].type == 'image/png' ||
        file[0].type == 'image/jpg' ||
        file[0].type == 'image/jpeg' ||
        file[0].type == 'application/pdf'
      ) {


        if (parseInt(file[0].size) > 2097152) {

        this.toast.error('file to large')
      }
      else {
        const date = 'Wed Feb 20 2019 00:00:00 GMT-0400 (Atlantic Standard Time)';
        const time = '7:00 AM';
        this.httpService.upload(file[0]).subscribe((data: any) => {
          // console.log(data?.body,'rtet');
          this.filename=data?.body
          if(type==='inside'){
          const control= this.survey.get("surveyDetail") as UntypedFormArray
          control.at(index).get('document')?.setValue( data?.body)
          control.at(index).get('document')?.updateValueAndValidity}
          else{
            this.survey.get("document")?.setValue(data?.body)
            this.survey.get("document")?.updateValueAndValidity
          }
        })
        }
      }
      else {
        this.toast.error('File uploaded is invalid!')
        // this.registrationForm.get(form)?.reset()
        // this.registrationForm.get(form)?.updateValueAndValidity()

      }
    }


    getPriject(event:any){

  this.state=[]
  this.project.map((item:any)=>{
    if(item.projectName===event.target.value){
      console.log(item.projectName);
      // this.state=item
      // console.log(this.state);

      this.survey.get('projectNumber')?.setValue(item.projectNumber)
      this.survey.get('projectNumber')?.updateValueAndValidity
      console.log(this.survey);

    item.acquisitionDetails?.map((projectData:any)=>{
      if (!this.state.includes(projectData.state)) {
        // ✅ only runs if value not in array
        this.state?.push(projectData.state);
      }
    })}

    this.survey.get('surveyDetail')?.reset()
    this.survey.get('surveyDetail')?.updateValueAndValidity

console.log(this.state);


  })


    }
    getobjecton(event:any,index:any){

      const control= this.survey.get("surveyDetail") as UntypedFormArray
      if(event.target.value==='Yes'){
        this.httpService.getobjectionType().subscribe((data:any)=>{
          this.objectionType.push(data?.objectionType)

                })
                control.at(index).get('objectionType')?.setValidators(Validators.required)
                control.at(index).get('objectionType')?.updateValueAndValidity
      }
      else{
        control.at(index).get('objectionType')?.clearValidators
                control.at(index).get('objectionType')?.updateValueAndValidity
                this.objectionType[index]=[]
      }


    }

    checkDecimal(type:any,i:any){
      const control =this.survey.get("surveyDetail") as UntypedFormArray
      let number
      if(type==='amount'){
      number= control.at(i).value.amount
      console.log(number);

    }
    else if(type==='area'){
      number= control.at(i).value.area
    }
    else if(type==='totalArea'){
      number= control.at(i).value.totalArea
    }
  if(!number.includes('.')){
    number= number+'.00'
    console.log(number);

  }
  control.at(i).get(type)?.setValue(number)
  control.at(i).get(type)?.updateValueAndValidity



    }

    keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
      // const charCode = (event.which) ? event.which : event.keyCode;
    //  return (charCode >= 48 && charCode <= 57) ||charCode == 46 || charCode == 0
      const charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode >= 48 && charCode <= 57) ||charCode == 46 || charCode == 0) {
        return true;}
      // }else if((charCode < 48 || charCode > 57)){
      //   event.preventDefault();
      //   return false;
      // }
      else {
        event.preventDefault();
          return false;
      }
    }

    getDistrict(event:any){
 let newdistrict:any =[]

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
      const control= this.survey.get("surveyDetail") as UntypedFormArray
      control.reset()
      control.updateValueAndValidity
     let newblock:any=[]
     this.block=[]
      this.project.map((item:any)=>{
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
          if (projectData.district===event.target.value) {

            if(!this.block.includes(projectData.block)){
          // ✅ only runs if value not in array
          console.log(item);

          this.block.push(projectData.block);}
          }
        })}
      })


    }

    getVillage(event:any,index:any){
      let newArray: any[]=[]
      const control= this.survey.get("surveyDetail") as UntypedFormArray
      this.village.splice(index,1)
      console.log(this.survey)
      this.project.map((item:any)=>{
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
          if (projectData.block===control.at(index).value.block) {
            if(!newArray.includes(projectData.village)){
              console.log('hello');
    newArray?.push(projectData.village);}
    // console.log(newArray);

          this.village.splice(index, 0, newArray);


          }
        })}
      })
      console.log(this.village);



    }

    onSubmit(type:any) {
      // let date=this.survey.value.data.toString()
    // console.log(this.survey);
    if(this.survey.valid){
      this.httpService.addSurvey({
        projectName:this.survey.value.projectName,
        projectNumber:this.survey.value.projectNumber,
        date:this.survey.value.date,
        surveyNumber:this.survey.value.surveyNumber,
        document:this.survey.value.document,
       state:this.survey.value.state,
       district:this.survey.value.district,
        surveyDetails:this.survey.value.surveyDetail ,

      }).subscribe((data:any)=>{
        this.toast.success('Survey Successfuly Added')
        if(type==='save'){
   this.router.navigate(['/dashboard/survey/surveyList'])}
   else{
    this.survey.reset()
   }
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
      this.router.navigate(['/dashboard/survey/surveyList'])

  }
  }
