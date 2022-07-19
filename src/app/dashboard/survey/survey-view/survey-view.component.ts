import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-survey-view',
  templateUrl: './survey-view.component.html',
  styleUrls: ['./survey-view.component.css']
})
export class SurveyViewComponent implements OnInit {



  state:any=[]
  id: any
  district:any=[]
  block:any=[]
  village:any=[]
  event: any = {
    target: { value: '' }
  }
  surveyData: any
  landType:any=[]
  landNature:any=[]
  landCategory:any=[]
  objectionType:any=[]
    project:any
    submitted:boolean=false
  filename: any;
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private data: DataService,
      private httpService:HttpsService,
      private toast: ToastrService,) {


      this.id = this.route.snapshot.paramMap.get('id')
      this.httpService.getSurveyByID(this.id).subscribe((data: any) => {
        this.surveyData = data.data
        this.surveyData.documents= environment.download + this.surveyData.documents

        this.surveyData.surveyDetails.map((item: any) => {
            item.document=environment.download + item.document
        })



      })




      }

    ngOnInit(): void {


      this.state=[]
    }






















    cancel() {
      this.router.navigate(['/dashboard/survey/surveyList'])

  }
  }
