import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnInit {

  submitted=false
  event: any = {
    target: { value: '' }
  }

  state: any;
  district:any[]= [];
  block:any[]= [];
  village:any[]=[] ;
  id: string | null;
  projectData: any;

  constructor(
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

      this.httpService.getProjectByID(this.id).subscribe((item:any)=>{
     this.projectData=item.findProject
     console.log(this.projectData);




      })
    }

  ngOnInit(): void {

  }
















  cancel() {
    this.router.navigate(['/dashboard/project/page'])

}
}
