import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  survey: any
  constructor(   private router: Router,
    private data: DataService,
    private toast: ToastrService,
    private httpService:HttpsService,
    private location: Location) {
      this.httpService.getSurvey().subscribe((data:any)=>{

      data.surveydata.map((item:any)=>{
        item.documents= environment.download + item.documents
      })

this.survey=data.surveydata

      })
    }

  ngOnInit(): void {

  }
  addsurvey() {
    this.router.navigate(['/dashboard/survey/addsurvey'])
  }
  navigateTo(path: any, item: any) {

    // if (item._id) {
    path = path + '/' + item._id

    console.log(path);

    this.router.navigate([path])
    // }
  }
  delete(id: any) {
    this.httpService.delsurvey(id).subscribe(res => {
      this.toast.success('deleted survey successfully')
      location.reload()
    }, err => {
      this.toast.error('Internal server error')
    })
  }

}
