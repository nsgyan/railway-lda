import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  Project: any
  constructor(   private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private httpService:HttpsService,) {
      this.httpService.getProject().subscribe((data:any)=>{
        this.Project=data.projects

      })
    }

  ngOnInit(): void {

  }
  addProject() {
    this.router.navigate(['/dashboard/project/add'])
  }

}
