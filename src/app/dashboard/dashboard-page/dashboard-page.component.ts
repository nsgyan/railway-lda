import { Component, OnInit } from '@angular/core';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
totalProject:any
totalBeneficiary:any
  constructor(private httpService:HttpsService) {
    this.httpService.totalProject().subscribe((item:any)=>{
      console.log(item);
this.totalProject=item.count
    })
    this.httpService.countBeneficiary().subscribe((item:any)=>{
      console.log(item);
this.totalBeneficiary=item.count
    })
   }

  ngOnInit(): void {
  }

}
