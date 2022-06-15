import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary, Project } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project!:FormGroup;


  constructor( private fb:FormBuilder,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
      this.project=this.fb.group({
        projectCode:[''],
        projectID:[''],
        projectName:[''],
        projectDescription:[''],
        selectDistrict : this.fb.array([]) ,


      })
    }

  ngOnInit(): void {
    this.addselectDistrict()
  }

  onSubmit() {console.log(this.project);

    const project=[new Project(
      this.project.value.projectCode,
      this.project.value.projectID,
       this.project.value.projectName,
        this.project.value.projectDescription,
        this.project.value.selectDistrict.length,)]



         this.data.addProject(project)
         this.router.navigate(['/dashboard/project'])

  }
  SelectDistrict(): FormArray {
    return this.project.get("selectDistrict") as FormArray
  }
  inputType(): FormArray {
    return this.project.get("inputType") as FormArray
  }
 get selectDistrict(): FormArray {
    return this.project.get("selectDistrict") as FormArray
  }

  newSelectDistrict(): FormGroup {
    return this.fb.group({
      district: ['',Validators.required],
      area:['',Validators.required],
      location: ['',Validators.required],
      Remark:['',Validators.required],
    })
  }


  addselectDistrict() {
    this.SelectDistrict().push(this.newSelectDistrict());
  }


  removeSelectDistrict(quesIndex:number) {
    this.SelectDistrict().removeAt(quesIndex);
  }


  cancel() {
    this.router.navigate(['/dashboard/project/beneficiariesList'])

}
}
