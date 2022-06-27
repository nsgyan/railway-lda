import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  project!:FormGroup;
  state: any;
  district: any;


  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private toster: ToasterService,
    private httpService:HttpsService,){
      this.httpService.getState().subscribe((data:any)=>{

        this.state=data?.state

              })
      this.project=this.fb.group({
        projectCode:[''],
        projectID:[''],
        projectName:[''],
        projectDescription:[''],
        selectState : this.fb.array([]) ,


      })
    }

  ngOnInit(): void {
    this.addselectState()
  }

  onSubmit() {console.log(this.project);

    // const project=[new Project(
    //   this.project.value.projectCode,
    //   this.project.value.projectID,
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
      Remark:['',Validators.required],
    })
  }


  addselectState() {
    this.selectStates().push(this.newselectState());
  }

  getblock(state:any){
    // console.log(state);
    // console.log(this.village.value.state);

    // this.httpService.getBlock(this.village.value.state,this.village.value.district).subscribe((data:any)=>{
    //   this.block=data?.blocks

    //         })
  }

  removeselectState(quesIndex:number) {
    this.selectStates().removeAt(quesIndex);
  }

  getDistrict(state:any,i:any){
    const control =this.project.get("selectState") as FormArray
    // console.log(state);
    console.log(control.at(i).value.state);

    this.httpService.getDistrict(control.at(i).value.state).subscribe((data:any)=>{
      this.district=data?.district

            })
  }


  cancel() {
    this.router.navigate(['/dashboard/project/beneficiariesList'])

}
}
