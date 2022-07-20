
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-add-payment-demand',
  templateUrl: './add-payment-demand.component.html',
  styleUrls: ['./add-payment-demand.component.css']
})
export class AddPaymentDemandComponent implements OnInit {
  paymendDemand:FormGroup;
  state:any=[]
  district:any=[]
  surveyData:any=[]
  beneficiaryData:any=[]
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
        })
        this.paymendDemand=this.fb.group({
          projectName:['',Validators.required],
          projectNumber:['',Validators.required],
          surveyNumber:['',Validators.required],
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
      return this.paymendDemand.get("beneficiary") as FormArray
    }
    inputType(): FormArray {
      return this.paymendDemand.get("inputType") as FormArray
    }
   get beneficiaryControl(): FormArray {
      return this.paymendDemand.get("beneficiary") as FormArray
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


  this.project.map((item:any)=>{
    if(item.projectName===event.target.value){
      this.paymendDemand.get('projectNumber')?.setValue(item.projectNumber)
      this.paymendDemand.get('projectNumber')?.updateValueAndValidity
      this.getSurvey(item.projectNumber)
   }





  })


    }

    getSurvey(projectNumber:any){

this.httpService.getsurveyByProject({projectNumber:projectNumber}).subscribe((data: any)=>{
  this.surveyData=data.findSurvey


})
    }

    getstate(event:any){
      this.state=[]
      this.surveyData.map((item:any)=>{
        if(item.projectName===this.paymendDemand.value.projectName){

            if(!this.state.includes(item.state))
   // ✅ only runs if value not in array
            this.state.push(item.state);
          }

      })
      this.paymendDemand.get('state')?.reset()
      this.paymendDemand.get('state')?.updateValueAndValidity
    }

    getDistrict(event:any){
  this.district=[]

      this.surveyData.map((item:any)=>{
        if(item.projectName===this.paymendDemand.value.projectName){
          if (item.state===event.target.value) {
            if(!this.district.includes(item.district))
   // ✅ only runs if value not in array
            this.district.push(item.district);
          }
       }
      })


    }
    getBlock(event:any){
      this.block=[]
      this.surveyData.map((item:any)=>{
        if(item.projectName===this.paymendDemand.value.projectName){

          if (item.state===this.paymendDemand.value.state&&item.district===this.paymendDemand.value.district) {
            item.surveyDetails.map((surveyData:any)=>{
              if(!this.block.includes(surveyData.block)){
                // ✅ only runs if value not in array
                  this.block.push(surveyData.block);}
            })

          }
      }
      })
      this.httpService.getBeneficiaryByStateDistrict({state:this.paymendDemand.value.state,district:this.paymendDemand.value.district}).subscribe((data:any)=>{
        this.surveyData.map((item:any)=>{
          item.surveyDetails.map((surveyData:any)=>{
            data.getBeneFiciary.map((beneFiciData:any)=>{
              if(beneFiciData.block===surveyData.block&& beneFiciData.village===surveyData.village){
                this.beneficiaryData.push(beneFiciData)
              }
            })
          })
        })
        console.log(this.beneficiaryData);


      })
    }

    getVillage(event:any,index:any){
      let newArray: any[]=[]
      const control= this.paymendDemand.get("beneficiary") as FormArray
      this.village.splice(index,1)
      console.log(this.paymendDemand)
      this.project.map((item:any)=>{
        if(item.projectName===this.paymendDemand.value.projectName){
        item.acquisitionDetails.map((projectData:any)=>{
          if (projectData.state===this.paymendDemand.value.state&&projectData.district===this.paymendDemand.value.district&&projectData.block===control.at(index).value.block) {
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
    console.log(this.paymendDemand);
    if(this.paymendDemand.valid){
      this.httpService.addBeneficiary({
        projectName:this.paymendDemand.value.projectName,
        projectNumber:this.paymendDemand.value.projectNumber,
        date:this.paymendDemand.value.date,
        state:this.paymendDemand.value.state,
        district:this.paymendDemand.value.district,
        beneficiary:this.paymendDemand.value.beneficiary ,

      }).subscribe((data:any)=>{
        this.toast.success(data?.message)
        this.router.navigate(['/dashboard/beneficiariesList'])
      },((err: { error: { message: any; }; })=>{
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



  // protected filterBanks() {
  //   if (!this.state) {
  //     return;
  //   }
  //   // get the search keyword
  //   let search = this.bankFilterCtrl.value;
  //   if (!search) {
  //     this.filteredBanks.next(this.state.slice());
  //     return;
  //   } else {
  //     search = search.toLowerCase();
  //   }
  //   // filter the state
  //   this.filteredBanks.next(
  //     this.state.filter((state:any) => state.toLowerCase().indexOf(search) > -1)
  //   );
  // }

  }
