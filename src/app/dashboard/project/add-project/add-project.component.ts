import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Beneficiary, Project } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  submitted=false
  project!:FormGroup;
  state: any;
  district:any[]= [];
  block:any[]= [];
  village:any[]=[] ;

  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private httpService:HttpsService,){
      this.httpService.getState().subscribe((data:any)=>{

        this.state=data?.state

              })
      this.project=this.fb.group({
        projectNumber:['',Validators.required],
        projectName:['',Validators.required],
        projectDescription:['',Validators.required],
        selectState : this.fb.array([]) ,


      })
    }

  ngOnInit(): void {
    this.addselectState()
  }

  onSubmit(type:any) {console.log(this.project);
if(this.project.valid){
  this.httpService.addProject({
    projectNumber:this.project.value.projectNumber,
    projectName:this.project.value.projectName,
    projectDescription:this.project.value.projectDescription,
    acquisitionDetails : this.project.value.selectState ,
  }).subscribe((data:any)=>{
    if(type==='Save'){
    this.toast.success(data?.message)
    this.router.navigate(['/dashboard/project/page'])}
    else{
      this.project.reset()
    }
  },(err=>{
    this.toast.error(err.error.message);
  }))
}
else{
  this.submitted=true
  this.toast.error('Please Fill Required Field');
}
    // const project=[new Project(
    //   this.project.value.projectCode,
    //   this.project.value.projectNumber,
    //    this.project.value.projectName,
    //     this.project.value.projectDescription,
    //     this.project.value.selectState.length,)]



    //      this.data.addProject(project)
    //      this.router.navigate(['/dashboard/project'])

  }
  selectStates(): FormArray {
    return this.project.get("selectState") as FormArray
  }
  inputType(): FormArray {
    return this.project.get("inputType") as FormArray
  }
 get selectState(): FormArray {
    return this.project.get("selectState") as FormArray
  }

  newselectState(): FormGroup {
    return this.fb.group({
      state: ['',Validators.required],
      district: ['',Validators.required],
      area:['',Validators.required],
      village: ['',Validators.required],
      sanctionedAmount:['',Validators.required],
      block: ['',Validators.required],
      remark:['',Validators.required],
    })
  }


  addselectState() {
    this.selectStates().push(this.newselectState());
  }

  getblock(state:any, i:any){
    // console.log(state);
    // console.log(this.village.value.state);
    const control =this.project.get("selectState") as FormArray
    this.httpService.getBlock(control.at(i).value.state,control.at(i).value.district).subscribe((data:any)=>{

      this.block.splice(i, 0, data?.blocks);
            })
  }
  checkDecimal(type:any,i:any){
    const control =this.project.get("selectState") as FormArray
    let number
    if(type==='sanctionedAmount'){
    number= control.at(i).value.sanctionedAmount
  }
  else{
    number= control.at(i).value.area
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

  keyPresschar(evt: any) {
    evt = (evt) ? evt : event;
    const charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
      ((evt.which) ? evt.which : 0));
    if (charCode > 31 && (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122)) {
      return false;
    }
    return true;
  }

  removeselectState(quesIndex:number) {
    this.selectStates().removeAt(quesIndex);
  }

  getDistrict(state:any,i:any){
    const control =this.project.get("selectState") as FormArray
    // console.log(state);
    console.log(control.at(i).value.state);

    this.httpService.getDistrict(control.at(i).value.state).subscribe((data:any)=>{
      this.district.splice(i, 0, data?.district);

            })
  }
  getVillage(state:any, i:any){
    // console.log(state);
    // console.log(this.village.value.state);
    const control =this.project.get("selectState") as FormArray
    this.httpService.getVillageByBlock(control.at(i).value.block).subscribe((data:any)=>{

      this.village.splice(i, 0, data?.village);

            })
  }



  cancel() {
    this.router.navigate(['/dashboard/project/beneficiariesList'])

}
}
