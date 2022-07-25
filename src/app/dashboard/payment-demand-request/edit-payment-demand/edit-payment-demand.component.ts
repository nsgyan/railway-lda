import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { CustomModelComponent } from 'src/app/shared/custom-model/custom-model.component';
import { DataService } from 'src/app/shared/data.service';
import  { HttpsService } from 'src/app/shared/https.service';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
interface Beneficiary{
  id: string;
  name: string;
}

@Component({
  selector: 'app-edit-payment-demand',
  templateUrl: './edit-payment-demand.component.html',
  styleUrls: ['./edit-payment-demand.component.css']
})
export class EditPaymentDemandComponent implements OnInit {
  [x: string]: any;

  stateCtrl = new FormControl('');
  filteredStates: Observable<Beneficiary[]> | undefined;


  paymentDemand:FormGroup;
  state:any=[]
  pipe = new DatePipe('en-US');
  selectedSurvey:any;
  district:any=[]
  event: any = {
    target: { value: '' }
  }
  surveyData:any=[]
  beneficiaryData:any=[]
  block:any=[]
  village:any=[]
    project:any

    name = "Angular";
    beneficiarylist: Beneficiary[] = [];

    selectedItems: Array<Beneficiary> = [];
    dropdownSettings: IDropdownSettings = {};

    submitted:boolean=false
  id: string | null;
    constructor( private fb:FormBuilder,
      private route:ActivatedRoute,
      private router: Router,
      private data: DataService,
      private httpService:HttpsService,
      private toast: ToastrService,
      public dialog: MatDialog) {
this.id=this.route.snapshot.paramMap.get('id')
this.httpService.getPaymentdemandByID(this.id).subscribe((data:any)=>{
  this.paymentDemandData=data.findPaymentDemand
  // this.project=data.projects
})
        this.httpService.getProject().subscribe((data:any)=>{
          this.project=data.projects
        })
        this.paymentDemand=this.fb.group({
          projectName:['',Validators.required],
          projectNumber:['',Validators.required],
          surveyNumber:['',Validators.required],
          date:['',Validators.required],
          state:['',Validators.required],
          district:['',Validators.required],
          beneficiaryDetails:this.fb.array([]) ,

        })

        this.httpService.getPaymentdemandByID(this.id).subscribe((data:any)=>{
          this.paymentDemandData=data.findPaymentDemand
          this.paymentDemandData.date=this.pipe.transform(this.paymentDemandData.date, 'yyyy-MM-dd');
          this.paymentDemand.get('projectName')?.setValue(this.paymentDemandData.projectName)
          this.paymentDemand.get('projectName')?.updateValueAndValidity
          this.event.target.value=this.paymentDemandData.projectName
          this.getPriject(this.event)
          this.paymentDemand.get('projectNumber')?.setValue(this.paymentDemandData.projectNumber)
          this.paymentDemand.get('projectNumber')?.updateValueAndValidity
          this.paymentDemand.get('surveyNumber')?.setValue(this.paymentDemandData.surveyNumber)
          this.paymentDemand.get('surveyNumber')?.updateValueAndValidity
          this.getstate()
          this.paymentDemand.get('date')?.setValue(this.paymentDemandData.date)
          this.paymentDemand.get('date')?.updateValueAndValidity
          this.paymentDemand.get('state')?.setValue(this.paymentDemandData.state)
          this.paymentDemand.get('state')?.updateValueAndValidity
          this.event.target.value=this.paymentDemandData.state
          this.getDistrict(this.event)
          this.paymentDemand.get('district')?.setValue(this.paymentDemandData.district)
          this.paymentDemand.get('district')?.updateValueAndValidity
          this.getBlock()
          const control=  this.paymentDemand.get("beneficiaryDetails") as FormArray
        this.paymentDemandData.beneficiaryDetails.map((item:any)=>{



          control.push( this.fb.group({
            block:[item.block,Validators.required],
            village: [item.village,Validators.required],
            beneficiaryName:[item.beneficiaryName,Validators.required],
            fatherOrHusbandName:[item.fatherOrHusbandName,Validators.required],
            gataNumber:[item.gataNumber,Validators.required],
            rakba:[item.rakba,Validators.required],
            pratifalRate:[item.pratifalRate,Validators.required],
            beneficaryShare:[item.beneficaryShare,Validators.required],
            // chequeNumber:[''],
            // chequeDate:[''],
            // registrationAmount:[''],
            // remark:['']
          }))

          })

          // this.project=data.projects
        })


      }

    ngOnInit(): void {
      this.filteredStates = this.stateCtrl.valueChanges.pipe(
        startWith(''),
        map(beneficiarylist => (beneficiarylist ? this._filterStates(beneficiarylist) : this.beneficiarylist.slice())),
      );
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };

      // this.httpService.getBeneficiary().subscribe((data: any) => {
      //   this.beneficiaryData = data.getBeneFiciary
      //   this.beneficiaryData.map((item:any)=>{
      //     this.beneficiarylist.push({
      //       _id: item._id,
      //       name: item.beneficiaryName
      //     })
      //   })

      // })
      // this.beneficiarylist = [
      //   { _id: "1", name: "New Delhi" },
      //   { _id: "2", name: "Mumbai" },
      //   { _id: "3", name: "Bangalore"},
      //   { _id: "4", name: "Pune" },
      //   { _id: "5", name: "Chennai" },
      //   { _id: "6", name: "Navsari" }
      // ];




      // this.addbeneficiary()
    }


    beneficiarys(): FormArray {
      return this.paymentDemand.get("beneficiaryDetails") as FormArray
    }
    inputType(): FormArray {
      return this.paymentDemand.get("beneficiaryDetails") as FormArray
    }
   get beneficiaryControl(): FormArray {
      return this.paymentDemand.get("beneficiaryDetails") as FormArray
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


    private _filterStates(value: string): Beneficiary[] {
      const filterValue = value.toLowerCase();

      return this.beneficiarylist.filter(beneficiarylist => beneficiarylist.name.toLowerCase().includes(filterValue));
    }


    getPriject(event:any){


  this.project.map((item:any)=>{
    if(item.projectName===event.target.value){
      this.paymentDemand.get('projectNumber')?.setValue(item.projectNumber)
      this.paymentDemand.get('projectNumber')?.updateValueAndValidity
      this.getSurvey(item.projectNumber)
   }





  })


    }

    getSurvey(projectNumber:any){
console.log(this.surveyData);

this.httpService.getsurveyByProject({projectNumber:projectNumber}).subscribe((data: any)=>{
  this.surveyData=data.findSurvey

})

    }

    getstate(){
      this.state=[]

      this.httpService.getsurveyByProject({projectNumber: this.paymentDemand.value.projectNumber}).subscribe((data: any)=>{
      data.findSurvey.map((item:any)=>{

          if(item.projectName===this.paymentDemand.value.projectName){
            this.selectedSurvey=item
              if(!this.state.includes(item.state))
     // ✅ only runs if value not in array
              this.state.push(item.state);
            }

        })
      })

      console.log(this.state),'dss';

      // this.paymentDemand.get('state')?.reset()
      // this.paymentDemand.get('state')?.updateValueAndValidity
    }

    getDistrict(event:any){
  this.district=[]
  this.httpService.getsurveyByProject({projectNumber: this.paymentDemand.value.projectNumber}).subscribe((data: any)=>{
    data.findSurvey.map((item:any)=>{

      if(item.projectName===this.paymentDemand.value.projectName){
        if (item.state===event.target.value) {
          if(!this.district.includes(item.district))
 // ✅ only runs if value not in array
          this.district.push(item.district);
        }
     }

      })
    })



    }
    getBlock(){
      this.block=[]
      this.surveyData.map((item:any)=>{
        console.log(item,'sd');

        if(item.projectName===this.paymentDemand.value.projectName){

          if (item.state===this.paymentDemand.value.state&&item.district===this.paymentDemand.value.district) {
            item.surveyDetails.map((surveyData:any)=>{
              if(!this.block.includes(surveyData.block)){
                // ✅ only runs if value not in array
                  this.block.push(surveyData.block);}
            })

          }
      }
      })
      this.httpService.getBeneficiaryByStateDistrict({state:this.paymentDemand.value.state,district:this.paymentDemand.value.district}).subscribe((data:any)=>{
        this.surveyData.map((item:any)=>{
          item.surveyDetails.map((surveyData:any)=>{
            data.getBeneFiciary.map((beneFiciData:any)=>{
              if(beneFiciData.block===surveyData.block&& beneFiciData.village===surveyData.village){
                this.beneficiaryData.push(beneFiciData)
              }
            })
          })
        })

this.beneficiaryData.map((item:any)=>{
   this.paymentDemandData.beneficiaryDetails.map((DemandData:any)=>{
if(DemandData.beneficiaryName===item.beneficiaryName&&DemandData.fatherOrHusbandName===item.fatherOrHusbandName&&DemandData.block===item.block&&DemandData.village===item.village){
  this.selectedItems.push({
    id: item._id,
    name: item.beneficiaryName
  })
}
   })
  this.beneficiarylist.push({
    id: item._id,
    name: item.beneficiaryName
  })
  console.log(this.selectedItems,'pre select');



})

console.log(this.beneficiarylist,'beneficiaryList');

      })
    }

    getVillage(event:any,index:any){
      let newArray: any[]=[]
      const control= this.paymentDemand.get("beneficiaryDetails") as FormArray
      this.village.splice(index,1)
      console.log(this.paymentDemand)
      this.project.map((item:any)=>{
        if(item.projectName===this.paymentDemand.value.projectName){
        item.acquisitionDetails.map((projectData:any)=>{
          if (projectData.state===this.paymentDemand.value.state&&projectData.district===this.paymentDemand.value.district&&projectData.block===control.at(index).value.block) {
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
    console.log(this.paymentDemand);
    if(this.paymentDemand.valid){
      this.httpService.updatePaymentdemand({
        projectName:this.paymentDemand.value.projectName,
        projectNumber:this.paymentDemand.value.projectNumber,
        date:this.paymentDemand.value.date,
        surveyNumber:this.paymentDemand.value.surveyNumber,
        state:this.paymentDemand.value.state,
        district:this.paymentDemand.value.district,
        beneficiaryDetails:this.paymentDemand.value.beneficiaryDetails ,

      },this.id).subscribe((data:any)=>{
        this.toast.success('Payment Demand Updated')
        this.router.navigate(['/dashboard/paymentDemandRequest/list'])
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

  checkDecimal(type:any,i:any){
    const control =this.paymentDemand.get("beneficiaryDetails") as FormArray
    let number
    if(type==='beneficaryShare'){
    number= control.at(i).value.beneficaryShare
    console.log(number);

  }
  else if(type==='pratifalRate'){
    number= control.at(i).value.pratifalRate
  }
  else if(type==='rakba'){
    number= control.at(i).value.rakba
  }
  else if(type==='gataNumber'){
    number= control.at(i).value.gataNumber
  }
if(number&&!number.includes('.')){
  number= number+'.00'
  console.log(number);

}
control.at(i).get(type)?.setValue(number)
control.at(i).get(type)?.updateValueAndValidity



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


  onItemSelect(selectData: any) {
    console.log(selectData,'sdsd');
this.stateCtrl.reset()
    this.selectedItems=[]
  const control=  this.paymendDemand.get("beneficiaryDetails") as FormArray

  this.beneficiaryData.map((item:any)=>{
if(item._id===selectData){
  let i=0
  let add:boolean=true
  while(control.length>i){
    if(item.block===control.at(i).value.block && item.village === control.at(i).value.village&&item.fatherOrHusbandName===control.at(i).value.fatherOrHusbandName && item.fatherOrHusbandName === control.at(i).value.fatherOrHusbandName){
      add=false

    }
    i++;


  }
  console.log(add);

  if(add||control.length===0){

  control.push( this.fb.group({
    block:[item.block,Validators.required],
    village: [item.village,Validators.required],
    beneficiaryName:[item.beneficiaryName,Validators.required],
    fatherOrHusbandName:[item.fatherOrHusbandName,Validators.required],
    gataNumber:['',Validators.required],
    rakba:['',Validators.required],
    pratifalRate:['',Validators.required],
    beneficaryShare:['',Validators.required],
    // chequeNumber:[''],
    // chequeDate:[''],
    // registrationAmount:[''],
    // remark:['']
  }))}

}
  })

  }
  onItemDeSelect(selectData: any) {
    const control=  this.paymentDemand.get("beneficiaryDetails") as FormArray

    this.beneficiaryData.map((item:any)=>{


  if(item._id===selectData.id){
    let i=0;
    console.log(item._id,selectData.id,'removed beneficiary');

    while(control.length>i){
      if(item.block===control.at(i).value.block && item.village === control.at(i).value.village&&item.fatherOrHusbandName===control.at(i).value.fatherOrHusbandName && item.fatherOrHusbandName === control.at(i).value.fatherOrHusbandName){
        this.removebeneficiary(i)

      }
      i++;


    }


  }
    })
  }

  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  onDropDownClose() {
    console.log('dropdown closed');
  }



  openDialog() {
    this.beneficiaryData=[]
    const dialogRef = this.dialog.open(CustomModelComponent,{
      data:this.selectedSurvey
    });

    dialogRef.afterClosed().subscribe(result => {
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
this.beneficiarylist=[ ]
this.beneficiaryData.map((item:any)=>{
  this.beneficiarylist.push({
    id: item._id,
    name: item.beneficiaryName
  })
  console.log(item);

})

console.log(this.beneficiarylist,'beneficiaryList');

      })
    });
  }

  }
