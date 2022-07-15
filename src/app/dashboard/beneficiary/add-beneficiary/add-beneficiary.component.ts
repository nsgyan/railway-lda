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
    this.httpService.getState().subscribe((data: any) => {
      data?.state.map((item: any) => {
        this.state.push(item.stateName)
      })

    })

    console.log(this.state, 'dgfhgjh');

      this.beneficiary=this.fb.group({
        beneficiaryName: ['', Validators.required],
        fatherOrHusbandName:['',Validators.required],
        adharNumber: ['', Validators.required],
        panNumber:['',Validators.required],
        dlNumber:['',Validators.required],
        rationCard:['',Validators.required],
        address: ['', Validators.required],
        state:['',Validators.required],
        district:['',Validators.required],
        block:['',Validators.required],
        village:['',Validators.required],
        pincode: ['', Validators.required],
        email: ['', Validators.required],
        modile: ['', Validators.required],
        partyType: ['', Validators.required],
        bank: ['', Validators.required],
        ifscCode: ['', Validators.required],
        accountNumber: ['', Validators.required],




      })


    }

  ngOnInit(): void {

  }

  getblock(state:any){
    this.beneficiary.get('block')?.reset()
    this.beneficiary.get('block')?.updateValueAndValidity()

    this.httpService.getBlock(this.beneficiary.value.state,this.beneficiary.value.district).subscribe((data:any)=>{
      this.block=data?.blocks

            })
  }

  getVillage(state:any){
    // console.log(state);
    // console.log(this.village.value.state);
    // const control =this.project.get("selectState") as FormArray
    this.httpService.getVillageByBlock(this.beneficiary.value.block).subscribe((data:any)=>{

      this.village=data?.village;

            })
  }


  getPriject(event:any){

this.state=[]
this.project.map((item:any)=>{
  if(item.projectName===event.target.value){
    this.beneficiary.get('projectNumber')?.setValue(item.projectNumber)
    this.beneficiary.get('projectNumber')?.updateValueAndValidity
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

  getDistrict(state: any) {
    this.beneficiary.get('district')?.reset()
    this.beneficiary.get('district')?.updateValueAndValidity()

    this.httpService.getDistrict(this.beneficiary.value.state).subscribe((data: any) => {
      this.district = data?.district


    })
  }
  // getBlock(event:any){
  //   this.block=[]
  //   this.project.map((item:any)=>{
  //     if(item.projectName===this.beneficiary.value.projectName){
  //     item.projectDetails.map((projectData:any)=>{
  //       if (projectData.state===this.beneficiary.value.state&&projectData.district===this.beneficiary.value.district) {
  //         if(!this.block.includes(projectData.block)){
  //       // ✅ only runs if value not in array
  //         this.block.push(projectData.block);}
  //       }
  //     })}
  //   })
  // }

  // getVillage(event:any,index:any){
  //   let newArray: any[]=[]
  //   const control= this.beneficiary.get("beneficiary") as FormArray
  //   this.village.splice(index,1)
  //   console.log(this.beneficiary)
  //   this.project.map((item:any)=>{
  //     if(item.projectName===this.beneficiary.value.projectName){
  //     item.projectDetails.map((projectData:any)=>{
  //       if (projectData.state===this.beneficiary.value.state&&projectData.district===this.beneficiary.value.district&&projectData.block===control.at(index).value.block) {
  //         if(!newArray.includes(projectData.village)){
  //           console.log('hello');
  // newArray.push(projectData.village);}
  // // console.log(newArray);

  //       this.village.splice(index, 0, newArray);


  //       }
  //     })}
  //   })
  //   console.log(this.village);



  // }

  onSubmit() {
    // let date=this.beneficiary.value.data.toString()
  console.log(this.beneficiary);
  if(this.beneficiary.valid){
    this.httpService.addBeneficiary({
      beneficiaryName: this.beneficiary.value.beneficiaryName,
        fatherOrHusbandName:this.beneficiary.value.fatherOrHusbandName,
        adharNumber: this.beneficiary.value.adharNumber,
        panNumber:this.beneficiary.value.panNumber,
        dlNumber:this.beneficiary.value.dlNumber,
        rationCard:this.beneficiary.value.rationCard,
        address: this.beneficiary.value.address,
        state:this.beneficiary.value.state,
        district:this.beneficiary.value.district,
        block:this.beneficiary.value.block,
        village:this.beneficiary.value.village,
        pincode: this.beneficiary.value.pincode,
        email: this.beneficiary.value.email,
        modile: this.beneficiary.value.modile,
        partyType: this.beneficiary.value.partyType,
        bank: this.beneficiary.value.bank,
        ifscCode: this.beneficiary.value.ifscCode,
        accountNumber: this.beneficiary.value.accountNumber,

    }).subscribe((data:any)=>{
      this.toast.success(data?.message)
      this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])
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
