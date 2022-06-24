import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-state-master-list',
  templateUrl: './state-master-list.component.html',
  styleUrls: ['./state-master-list.component.css']
})
export class StateMasterListComponent implements OnInit {

  submitted=false
  state: any;
  district: any;
  block: any;

  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
      this.httpService.getState().subscribe((data:any)=>{
        this.state=data?.state

              })
    }

  ngOnInit(): void {

  }



  getblock(){


    this.httpService.districtList().subscribe((data:any)=>{
      this.district=data?.district

            })
  }


  addDistrict(){
    this.router.navigate(['/dashboard/masters/district'])
  }


}
