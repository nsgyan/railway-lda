import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-district-master-list',
  templateUrl: './district-master-list.component.html',
  styleUrls: ['./district-master-list.component.css']
})
export class DistrictMasterListComponent implements OnInit {


  submitted=false
  state: any;
  district: any;
  block: any;
  districtData: any;

  constructor( private fb:FormBuilder,
    private httpService:HttpsService,
    private router: Router,
    private data: DataService,
    private toster: ToasterService){
this.getblock()
    }

  ngOnInit(): void {

  }



  getblock(){


    this.httpService.districtList().subscribe((data:any)=>{
      this.districtData=data?.district

            })
  }


  addDistrict(){
    this.router.navigate(['/dashboard/masters/district'])
  }
  edit(id:any){
    let url: string = "/dashboard/masters/districtEdit/" + id
    this.router.navigateByUrl(url);
  }


}
