import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpsService } from '../shared/https.service';
import { LocalstorageService } from '../shared/localstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private httpService:HttpsService,
    private localStorage:LocalstorageService,
    private router: Router,) {
  this.httpService.getState().subscribe(data=>{

  },err=>{
this.localStorage.clearLocalStorage()
this.router.navigate(['/login'])
  })
   }

  ngOnInit(): void {
  }

}
