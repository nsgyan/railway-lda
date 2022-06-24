import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-village-master-list',
  templateUrl: './village-master-list.component.html',
  styleUrls: ['./village-master-list.component.css']
})
export class VillageMasterListComponent implements OnInit {

  submitted=false
  village: any;


  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
      this.httpService.village().subscribe((data:any)=>{
        this.village=data?.village

              })
    }

  ngOnInit(): void {

  }





  addvillage(){
    this.router.navigate(['/dashboard/masters/village'])
  }


}
