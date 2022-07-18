import { Location } from '@angular/common';
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
  disrtict:any;
  constructor(   private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private httpService:HttpsService,
    private localtion:Location) {
      this.httpService.getProject().subscribe((data:any)=>{
        this.Project=data.projects
        this.Project.map((item:any)=>{
          this.disrtict=[]
          item?.acquisitionDetails.map((acqItem:any)=>{
            if(!this.disrtict.includes(acqItem.district)){
              this.disrtict.push(acqItem.district)
            }
item.disrtictLength=this.disrtict.length
          })
        })
        console.log(this.Project);


      })
    }

  ngOnInit(): void {

  }
  addProject() {
    this.router.navigate(['/dashboard/project/add'])
  }
  navigateTo(path: any, item: any) {

    // if (item._id) {
    path = path + '/' + item._id

    console.log(path);

    this.router.navigate([path])
    // }
  }
  delete(id:any){
    this.httpService.deletedProject(id).subscribe(item=>{
      this.toast.success('Project Successfuly Deleted')
      this.router.navigate(['/dashboard/project/page'])
      location.reload()
    },(err)=>{
      this.toast.error('Plz try again')
    })
  }

}
