import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.component.html',
  styleUrls: ['./edit-beneficiary.component.css']
})
export class EditBeneficiaryComponent implements OnInit {
  beneficiary:FormGroup;
state:any=[]
district:any=[]
block:any=[]
village:any=[]
  project:any
  submitted:boolean=false
  id: string | null;
  beneficiaryData: any;
  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private httpService:HttpsService,
    private toast: ToastrService,
    private route:ActivatedRoute) {
    this.httpService.getState().subscribe((data: any) => {
      data?.state.map((item: any) => {
        this.state.push(item.stateName)
      })

    })

    console.log(this.state, 'dgfhgjh');

      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getState().subscribe((data: any) => {
        data?.state.map((item: any) => {
          this.state.push(item.stateName)
        })

      })
      this.beneficiary=this.fb.group({
        beneficiaryName: ['', Validators.required],
        fatherOrHusbandName:['',Validators.required],
        aadhaarNumber: ['', Validators.required],
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

      this.httpService.getBeneficiaryByID(this.id).subscribe((data: any) => {
this.beneficiaryData=data.data
        this.beneficiary.get('beneficiaryName')?.setValue(this.beneficiaryData?.beneficiaryName)
        this.beneficiary.get('beneficiaryName')?.updateValueAndValidity()
        this.beneficiary.get('fatherOrHusbandName')?.setValue(this.beneficiaryData?.fatherOrHusbandName)
        this.beneficiary.get('fatherOrHusbandName')?.updateValueAndValidity()
        this.beneficiary.get('aadhaarNumber')?.setValue(this.beneficiaryData.aadhaarNumber)
        this.beneficiary.get('aadhaarNumber')?.updateValueAndValidity()
        this.beneficiary.get('panNumber')?.setValue(this.beneficiaryData.panNumber)
        this.beneficiary.get('panNumber')?.updateValueAndValidity()
        this.beneficiary.get('dlNumber')?.setValue(this.beneficiaryData.dlNumber)
        this.beneficiary.get('dlNumber')?.updateValueAndValidity()
        this.beneficiary.get('rationCard')?.setValue(this.beneficiaryData.rationCard)
        this.beneficiary.get('rationCard')?.updateValueAndValidity()
        this.beneficiary.get('address')?.setValue(this.beneficiaryData.address)
        this.beneficiary.get('address')?.updateValueAndValidity()
        this.beneficiary.get('state')?.setValue(this.beneficiaryData.state)
        this.beneficiary.get('state')?.updateValueAndValidity()
        this.getDistrict()
        this.beneficiary.get('district')?.setValue(this.beneficiaryData.district)
        this.beneficiary.get('district')?.updateValueAndValidity()
        this.getblock()

        this.beneficiary.get('block')?.setValue(this.beneficiaryData.block)
        this.beneficiary.get('block')?.updateValueAndValidity()
        this.getVillage()
        this.beneficiary.get('village')?.setValue(this.beneficiaryData.village)
        this.beneficiary.get('village')?.updateValueAndValidity()
        this.beneficiary.get('pincode')?.setValue(this.beneficiaryData.pincode)
        this.beneficiary.get('pincode')?.updateValueAndValidity()
        this.beneficiary.get('email')?.setValue(this.beneficiaryData.email)
        this.beneficiary.get('email')?.updateValueAndValidity()
        this.beneficiary.get('modile')?.setValue(this.beneficiaryData.modile)
        this.beneficiary.get('modile')?.updateValueAndValidity()
        this.beneficiary.get('partyType')?.setValue(this.beneficiaryData.partyType)
        this.beneficiary.get('partyType')?.updateValueAndValidity()
        this.beneficiary.get('bank')?.setValue(this.beneficiaryData.bank)
        this.beneficiary.get('bank')?.updateValueAndValidity()
        this.beneficiary.get('ifscCode')?.setValue(this.beneficiaryData.ifscCode)
        this.beneficiary.get('ifscCode')?.updateValueAndValidity()
        this.beneficiary.get('accountNumber')?.setValue(this.beneficiaryData.accountNumber)
        this.beneficiary.get('accountNumber')?.updateValueAndValidity()



      })


    }

  ngOnInit(): void {

  }

  getblock(){
    this.beneficiary.get('block')?.reset()
    this.beneficiary.get('block')?.updateValueAndValidity()

    this.httpService.getBlock(this.beneficiary.value.state,this.beneficiary.value.district).subscribe((data:any)=>{
      this.block=data?.blocks

            })
  }

  getVillage(){
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

  getDistrict() {
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
    this.httpService.updateBeneficiary({
      beneficiaryName: this.beneficiary.value.beneficiaryName,
        fatherOrHusbandName:this.beneficiary.value.fatherOrHusbandName,
        aadhaarNumber: this.beneficiary.value.aadhaarNumber,
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

    },this.id).subscribe((data:any)=>{
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
