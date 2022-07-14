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
  beneficiary!: FormGroup;
  state: any = []
  district: any = []
  block: any = []
  village: any = []
  id: any
  beneficiaryData: any
  project: any
  submitted: boolean = false
  constructor(private fb: FormBuilder,
    private router: Router,
    private data: DataService,
    private httpService: HttpsService,
    private route: ActivatedRoute,
    private toast: ToastrService,) {
    this.beneficiary = this.fb.group({
      partyName: [, Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      pincode: ['', Validators.required],
      email: ['', Validators.required],
      modile: ['', Validators.required],
      partyType: ['', Validators.required],
      bank: ['', Validators.required],
      ifscCode: ['', Validators.required],
      accountNumber: ['', Validators.required],




    })
    this.id = this.route.snapshot.paramMap.get('id')
    this.httpService.getState().subscribe((data: any) => {
      data?.state.map((item: any) => {
        this.state.push(item.stateName)
      })

    })

    this.httpService.getBeneficiaryByID(this.id).subscribe((data: any) => {
      console.log(data);
      this.beneficiaryData = data.data
      this.beneficiary.get('partyName')?.setValue(this.beneficiaryData.partyName)
      this.beneficiary.get('partyName')?.updateValueAndValidity



    })
    console.log(this.state, 'dgfhgjh');



  }

  ngOnInit(): void {

  }






  getPriject(event: any) {

    this.state = []
    this.project.map((item: any) => {
      if (item.projectName === event.target.value) {
        this.beneficiary.get('projectNumber')?.setValue(item.projectNumber)
        this.beneficiary.get('projectNumber')?.updateValueAndValidity
        item.projectDetails.map((projectData: any) => {
          if (!this.state.includes(projectData.state)) {
            // ✅ only runs if value not in array
            this.state.push(projectData.state);
          }
        })
      }
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
    if (this.beneficiary.valid) {
      this.httpService.addBeneficiary({
        partyName: this.beneficiary.value.partyName,
        address: this.beneficiary.value.address,
        state: this.beneficiary.value.state,
        district: this.beneficiary.value.district,
        pincode: this.beneficiary.value.pincode,
        email: this.beneficiary.value.email,
        modile: this.beneficiary.value.modile,
        partyType: this.beneficiary.value.partyType,
        bank: this.beneficiary.value.bank,
        ifscCode: this.beneficiary.value.ifscCode,
        accountNumber: this.beneficiary.value.accountNumber,

      }).subscribe((data: any) => {
        this.toast.success(data?.message)
        this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])
      }, (err => {
        this.toast.error(err.error.message);
      }))

    }
    else {
      this.submitted = true
      this.toast.error('Please Fill Required Field');
    }


  }

  cancel() {
    this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])

  }
}
