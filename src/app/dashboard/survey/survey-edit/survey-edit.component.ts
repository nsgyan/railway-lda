import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {
  survey!: FormGroup;
  state:any=[]
  id: any
  district:any=[]
  block:any=[]
  village:any=[]
  event: any = {
    target: { value: '' }
  }
  surveyData: any
  landType:any=[]
  landNature:any=[]
  landCategory:any=[]
  objectionType:any=[]
    project:any
    submitted:boolean=false
  filename: any;
    constructor( private fb:FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private data: DataService,
      private httpService:HttpsService,
      private toast: ToastrService,) {
      this.survey = this.fb.group({
        projectName:['',Validators.required],
        projectNumber:['',Validators.required],
        date:['',Validators.required],
        surveyNumber:['',Validators.required],
        surveyDetail:this.fb.array([]) ,
        document:['',Validators.required],
       state:['',Validators.required],
       district:['',Validators.required],
      })
      this.httpService.getlandNature().subscribe((data: any) => {
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
      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getSurveyByID(this.id).subscribe((data: any) => {
        this.surveyData = data.data
        this.surveyData.documents= environment.download + this.surveyData.documents
        console.log(this.surveyData);

        this.survey.get('projectName')?.setValue(this.surveyData?.projectName)
        this.survey.get('projectName')?.updateValueAndValidity()
        this.survey.get('projectNumber')?.setValue(this.surveyData?.projectNumber)
        this.survey.get('projectNumber')?.updateValueAndValidity()
        this.survey.get('date')?.setValue(this.surveyData?.date)
        this.survey.get('date')?.updateValueAndValidity()
        this.survey.get('document')?.setValue(this.surveyData?.documents)
        this.survey.get('document')?.updateValueAndValidity()
        this.survey.get('surveyNumber')?.setValue(this.surveyData?.surveyNumber)
        this.survey.get('surveyNumber')?.updateValueAndValidity()
        this.survey.get('state')?.setValue(this.surveyData?.state)
        this.survey.get('state')?.updateValueAndValidity()
        this.survey.get('district')?.setValue(this.surveyData?.district)
        this.survey.get('district')?.updateValueAndValidity()
        this.getEditPriject(this.survey.value.projectName)
        const control = this.survey.get("surveyDetail") as FormArray
        let i = 0
        this.event.target.value =   this.surveyData.state
        this.getDistrict(this.event)
        this.event.target.value =   this.surveyData.district
        this.getBlock(this.event)
        this.surveyData.surveyDetails.map((item: any) => {
          control.push(
            this.fb.group({
              block:[item.block,Validators.required],
              village: [item.village,Validators.required],
              area:[item.area,Validators.required],
              totalArea:[item.totalArea,Validators.required],
              amount:[item.amount,Validators.required],
              beneficiaryCount:[item.beneficiaryCount,Validators.required],
              landType:[item.landType,Validators.required],
              landNature:[item.landNature,Validators.required],
              landCategory:[item.landCategory,Validators.required],
              objecton:[item.objecton,Validators.required],
              objectionType:[item.objectionType],
              document:[item.document,Validators.required],


            }))
            item.document=environment.download + item.document

          // console.log();

          this.event.target.value = item.block
          this.getVillage(this.event, i)
          console.log(this.block,'dfg');

          this.event.target.value = item.objecton
          this.getobjecton(this.event, i)
          // console.log(this.objectionType, 'objen');

          i++
        })

      })




      }

    ngOnInit(): void {


      this.state=[]
    }

    delete(conttrolName: string) {


    }

    surveys(): FormArray {
      return this.survey.get("surveyDetail") as FormArray
    }
    inputType(): FormArray {
      return this.survey.get("inputType") as FormArray
    }
   get surveyControl(): FormArray {
      return this.survey.get("surveyDetail") as FormArray
    }

    newsurvey(): FormGroup {
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

          this.filename=data?.body
          if(type==='inside'){
          const control= this.survey.get("surveyDetail") as FormArray
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

  getEditPriject(value: any) {

    this.state = []
    this.project.map((item: any) => {
      if (item.projectName === value) {

        // this.state=item


        this.survey.get('projectNumber')?.setValue(item.projectNumber)
        this.survey.get('projectNumber')?.updateValueAndValidity


        item.acquisitionDetails?.map((projectData: any) => {
          if (!this.state.includes(projectData.state)) {
            // ✅ only runs if value not in array
            this.state?.push(projectData.state);
          }
        })
      }

      this.survey.get('surveyDetail')?.reset()
      this.survey.get('surveyDetail')?.updateValueAndValidity




    })


  }

    getPriject(event:any){

  this.state=[]
  this.project.map((item:any)=>{
    if(item.projectName===event.target.value){

      // this.state=item


      this.survey.get('projectNumber')?.setValue(item.projectNumber)
      this.survey.get('projectNumber')?.updateValueAndValidity


    item.acquisitionDetails?.map((projectData:any)=>{
      if (!this.state.includes(projectData.state)) {
        // ✅ only runs if value not in array
        this.state?.push(projectData.state);
      }
    })}

    this.survey.get('surveyDetail')?.reset()
    this.survey.get('surveyDetail')?.updateValueAndValidity




  })


    }


  getobjecton(event: any, index: any) {

    let newobjectionType: any = []
      const control= this.survey.get("surveyDetail") as FormArray
      if(event.target.value==='Yes'){
        this.httpService.getobjectionType().subscribe((data:any)=>{
          data?.objectionType.map((item: any) => {
            // newObjecton.push(item.objectionType)
            newobjectionType.push(item.objectionType);
          })
          this.objectionType.splice(index, 0, newobjectionType);


                })
                control.get('objectionType')?.setValidators(Validators.required)
                control.get('objectionType')?.updateValueAndValidity
        // this.objectionType.splice(index, 0, newObjecton);

      }
      else{
        control.get('objectionType')?.clearValidators
                control.get('objectionType')?.updateValueAndValidity
        this.objectionType[index] = []
      }


    }

    getBeneficiaryCount(event:any,index:any){
      const control= this.survey.get("surveyDetail") as FormArray
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


    getDistrict(event:any){
      console.log(event.target.value);

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
      // this.district.splice(index, 0, newdistrict);



    }

    getBlock(event:any){
     let newblock:any=[]
      this.project.map((item:any)=>{
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
          if (projectData.district===event.target.value) {

            if(!  this.block.includes(projectData.block)){
          // ✅ only runs if value not in array


          this.block.push(projectData.block);}
          }
        })}
      })
      // this.block.splice(index, 0, newblock);


    }

    getVillage(event:any,index:any){
      let newArray: any[]=[]
      const control= this.survey.get("surveyDetail") as FormArray
      this.village.splice(index,1)

      this.project.map((item:any)=>{
        if(item.projectName===this.survey.value.projectName){
        item.acquisitionDetails?.map((projectData:any)=>{
          if (projectData.block===control.at(index).value.block) {
            if(!newArray.includes(projectData.village)){

    newArray?.push(projectData.village);}


          this.village.splice(index, 0, newArray);


          }
        })}
      })




    }

    onSubmit() {
      // let date=this.survey.value.data.toString()

    if(this.survey.valid){
      this.httpService.updatesurvey({
        projectName:this.survey.value.projectName,
        projectNumber:this.survey.value.projectNumber,
        date:this.survey.value.date,
        documents: this.survey.value.document,
        surveyDetails:this.survey.value.surveyDetail ,

      }, this.id).subscribe((data: any) => {
        this.toast.success(data?.message)
        this.router.navigate(['/dashboard/survey/surveyList'])
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
