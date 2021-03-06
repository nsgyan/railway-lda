import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { panValidation, CellNumValidation } from '../custom-validation.service';
import { DataService } from '../data.service';
import { HttpsService } from '../https.service';

@Component({
  selector: 'app-custom-model',
  templateUrl: './custom-model.component.html',
  styleUrls: ['./custom-model.component.css']
})
export class CustomModelComponent implements OnInit {
  beneficiary:FormGroup;
  state:any=[]
  district:any=[]
  block:any=[]


  village:any=[]
  project:any
     submitted:boolean=false
    bankData: any

   constructor( private fb:FormBuilder,
    public dialogRef: MatDialogRef<CustomModelComponent>,
      private router: Router,
      private httpService:HttpsService,
      private toast: ToastrService,
      @Inject(MAT_DIALOG_DATA) public data: any) {

        // console.log(data,'dffff');
        data.surveyDetails.map((item:any)=>{
          // console.log(item.block);

          if(!this.block.includes(item.block)){
          this.block.push(item?.block)
          }
        })

        // data.map((item:any)=>{

        // })
      //   this.httpService.getBank().subscribe((data:any)=>{
      //     this.bankData=data?.bank

      //           })
      // this.httpService.getState().subscribe((data: any) => {
      //   data?.state.map((item: any) => {
      //     this.state.push(item.stateName)
      //   })

      // })

      console.log(this.state, 'dgfhgjh');

        this.beneficiary=this.fb.group({
          beneficiaryName: ['', Validators.required],
          fatherOrHusbandName:['',Validators.required],
          aadhaarNumber: ['', [Validators.required,Validators.maxLength(12),Validators.minLength(12)]],
          panNumber:['',[Validators.required,panValidation]],
          dlNumber:['',[Validators.required,Validators.pattern('^[A-Za-z][0-9/\W/]{2,20}$')]],
          rationCard:['',[Validators.required,Validators.pattern('^([a-zA-Z0-9]){8,12}\s*$')]],
          state:[data.state,Validators.required],
          district:[data.district,Validators.required],
          block:['',Validators.required],
          village:['',Validators.required],

        })


      }

    ngOnInit(): void {

    }

    conformAccountNumber(event: any,) {
      this.beneficiary.get('conformAccountNumber')?.clearAsyncValidators()
      this.beneficiary.get('conformAccountNumber')?.updateValueAndValidity
      if (event.target.value !== this.beneficiary.value.accountNumber) {
        this.beneficiary.get('conformAccountNumber')?.setErrors({ conformAccountNumber: true })
      }
      else {
        // const email = event.target.value ? event.target.value.toLowerCase() : this.beneficiary.get('email')?.value
        // if (email) {
        //   this.httpService.checkEmail({ email: email })
        //     .subscribe((data: any) => {
        //       if (email === data?.email) {
        //         this.beneficiary.get('email')?.setErrors({ isExist: true });
        //       }

        //     })

        // }

      }
    }

    // getblock(state:any){
    //   this.beneficiary.get('block')?.reset()
    //   this.beneficiary.get('block')?.updateValueAndValidity()

    //   this.httpService.getBlock(this.beneficiary.value.state,this.beneficiary.value.district).subscribe((data:any)=>{
    //     this.block=data?.blocks

    //           })
    // }

    getVillage(state:any){
      // console.log(state);
      // console.log(this.village.value.state);
      // const control =this.project.get("selectState") as FormArray
      // this.httpService.getVillageByBlock(this.beneficiary.value.block).subscribe((data:any)=>{

      //   this.village=data?.village;

      //         })

      this.data.surveyDetails.map((item:any)=>{
        console.log(item.block);

        if( this.beneficiary.value.block ===item.block&& !this.village.includes(item.village)){
        this.village.push(item?.village)
        }
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
        // ??? only runs if value not in array
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
    //       // ??? only runs if value not in array
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


    checkAadhaar(event: any) {
      this.httpService.checkAadhar({ aadhaarNumber: event.target.value }).subscribe((data: any) => {
        console.log(data);

      }, (err: any) => {
        this.beneficiary.get('aadhaarNumber')?.setErrors({ isExist: true })

      })

    }


    checkpan(event: any) {
      this.httpService.checkPan({ panNumber: event.target.value }).subscribe((data: any) => {
        console.log(data);

      }, (err: any) => {
        this.beneficiary.get('panNumber')?.setErrors({ isExist: true })

      })

    }

    checkDl(event: any) {
      this.httpService.dlcheck({ dlNumber: event.target.value }).subscribe((data: any) => {
        console.log(data);

      }, (err: any) => {
        this.beneficiary.get('dlNumber')?.setErrors({ isExist: true })

      })

    }
    checkration(event: any) {
      this.httpService.ration({ rationCard: event.target.value }).subscribe((data: any) => {
        console.log(data);

      }, (err: any) => {
        this.beneficiary.get('rationCard')?.setErrors({ isExist: true })

      })

    }

    onSubmit() {
      // let date=this.beneficiary.value.data.toString()

    console.log(this.beneficiary);
    if(this.beneficiary.valid){
      this.httpService.addBeneficiary({
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

      }).subscribe((data:any)=>{
        this.toast.success('Beneficiary Add successfully ')
        this.dialogRef.close();
        // this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])
      },((err: { error: { message: string | undefined; }; })=>{
        this.toast.error(err.error.message);
      }))
      this.beneficiary.get('conformAccountNumber')?.setErrors({ conformAccountNumber: true })
    }
    else{
      this.submitted=true
      this.toast.error('Please Fill Required Field');
    }


    }

    keyPressNumbers(event: { which: any; keyCode: any; preventDefault: () => void; }) {
      // const charCode = (event.which) ? event.which : event.keyCode;
    //  return (charCode >= 48 && charCode <= 57) ||charCode == 46 || charCode == 0
      const charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode >= 48 && charCode <= 57)  || charCode == 0) {
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

    keyPresschar(evt: any) {
      evt = (evt) ? evt : event;
      const charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
        ((evt.which) ? evt.which : 0));
      if (charCode < 31 && (charCode > 65 || charCode < 90) &&
        (charCode > 97 || charCode < 122)) {
          return false;

      }
      return true;
    }


    cancel() {
      this.dialogRef.close();
      // this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])

  }
  }

