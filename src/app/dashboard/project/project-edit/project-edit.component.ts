import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  project!:FormGroup;
  state: any;
  district:any[]= [];
  block:any[]= [];
  village:any[]=[] ;
  id: string | null;

  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private httpService:HttpsService,
    private route: ActivatedRoute,){
      // getProjectByID
      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getState().subscribe((data:any)=>{

        this.state=data?.state

              })
      this.project=this.fb.group({
        projectNumber:['',Validators.required],
        projectName:['',Validators.required],
        projectDescription:['',Validators.required],
        selectState : this.fb.array([]) ,


      })
      this.httpService.getProjectByID(this.id).subscribe((data: any) => {

      console.log(data);


      })
    }

  ngOnInit(): void {
    this.addselectState()
  }

  onSubmit() {console.log(this.project);
if(this.project.valid){
  this.httpService.addProject({
    projectNumber:this.project.value.projectNumber,
    projectName:this.project.value.projectName,
    projectDescription:this.project.value.projectDescription,
    acquisitionDetails : this.project.value.selectState ,
  }).subscribe((data:any)=>{
    this.toast.success(data?.message)
    this.router.navigate(['/dashboard/project/page'])
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
