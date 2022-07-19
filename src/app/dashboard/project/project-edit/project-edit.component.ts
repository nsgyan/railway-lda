
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, UntypedFormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  submitted=false
  event: any = {
    target: { value: '' }
  }
  project!:UntypedFormGroup;
  state: any;
  district:any[]= [];
  block:any[]= [];
  village:any[]=[] ;
  id: string | null;
  projectData: any;

  constructor( private fb:UntypedFormBuilder,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private route:ActivatedRoute,
    private httpService:HttpsService,){
      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getState().subscribe((data:any)=>{
        // getProjectByID
        this.state=data?.state

              })
      this.project=this.fb.group({
        projectNumber:['',Validators.required],
        projectName:['',Validators.required],
        projectDescription:['',Validators.required],
        selectState : this.fb.array([]) ,


      })
      this.httpService.getProjectByID(this.id).subscribe((item:any)=>{
     this.projectData=item.findProject
     console.log(this.projectData);

     this.project.get('projectNumber')?.setValue(this.projectData?.projectNumber)
     this.project.get('projectNumber')?.updateValueAndValidity()
     this.project.get('projectName')?.setValue(this.projectData?.projectName)
     this.project.get('projectName')?.updateValueAndValidity()
     this.project.get('projectDescription')?.setValue(this.projectData?.projectDescription)
     this.project.get('projectDescription')?.updateValueAndValidity()
   let control= this.project.get("selectState") as UntypedFormArray
   let i=0
     this.projectData.acquisitionDetails.map((projectItem:any)=>{
      control.push(this.fb.group({
        state: [projectItem?.state,Validators.required],
        district: [projectItem?.district,Validators.required],
        area:[projectItem?.area,Validators.required],
        village: [projectItem?.village,Validators.required],
        sanctionedAmount:[projectItem?.sanctionedAmount,Validators.required],
        block: [projectItem?.block,Validators.required],
        remark:[projectItem?.remark,Validators.required],
      }))
      this.event.target.value=projectItem.state
      this.getDistrict(this.event,i)
      this.event.target.value=projectItem.district
      this.getblock(this.event,i)
      this.event.target.value=projectItem.block
      this.getVillage(this.event,i)
i++;
     })

      })
    }

  ngOnInit(): void {

  }

  onSubmit(type:any) {console.log(this.project);
if(this.project.valid){
  this.httpService.updateProject({
    projectCode:this.projectData?.projectCode,
    projectNumber:this.project.value.projectNumber,
    projectName:this.project.value.projectName,
    projectDescription:this.project.value.projectDescription,
    acquisitionDetails : this.project.value.selectState ,
  },this.id).subscribe((data:any)=>{
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
  selectStates(): UntypedFormArray {
    return this.project.get("selectState") as UntypedFormArray
  }
  inputType(): UntypedFormArray {
    return this.project.get("inputType") as UntypedFormArray
  }
 get selectState(): UntypedFormArray {
    return this.project.get("selectState") as UntypedFormArray
  }

  newselectState(): UntypedFormGroup {
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
    const control =this.project.get("selectState") as UntypedFormArray
    this.httpService.getBlock(control.at(i).value.state,control.at(i).value.district).subscribe((data:any)=>{
      if(this.block.length=== i-1){
        this.block.splice(i, 0, data?.blocks);
      }
        else{
          this.block[i]=data?.blocks
        }
      // this.block.splice(i, 0, data?.blocks);
            })
  }
  checkDecimal(type:any,i:any){
    const control =this.project.get("selectState") as UntypedFormArray
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
    const control =this.project.get("selectState") as UntypedFormArray
    // console.log(state);
    console.log(control.at(i).value.state);

    this.httpService.getDistrict(control.at(i).value.state).subscribe((data:any)=>{
      // this.district.splice(i, 0, data?.district);
      if(this.district.length=== i-1){
        this.district.splice(i, 0, data?.district);}
        else{
          this.district[i]=data?.district
        }

            })
  }
  getVillage(state:any, i:any){
    // console.log(state);
    // console.log(this.village.value.state);
    const control =this.project.get("selectState") as UntypedFormArray
    this.httpService.getVillageByBlock(control.at(i).value.block).subscribe((data:any)=>{
      if(this.village.length=== i-1){
        this.village.splice(i, 0, data?.village);
      }
        else{
          this.village[i]=data?.village
        }
      // this.village.splice(i, 0, data?.village);

            })
  }



  cancel() {
    this.router.navigate(['/dashboard/project/page'])

}
}
