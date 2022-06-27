import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';
import { ToasterService } from 'src/app/shared/toaster.service';

@Component({
  selector: 'app-block-master-list',
  templateUrl: './block-master-list.component.html',
  styleUrls: ['./block-master-list.component.css']
})
export class BlockMasterListComponent implements OnInit {

  submitted=false
  state: any;
  district: any;
  block: any;

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


    this.httpService.blocksList().subscribe((data:any)=>{
      this.block=data?.blocks

            })
  }


  addBlock(){
    this.router.navigate(['/dashboard/masters/block'])
  }

  edit(id:any){
    let url: string = "/dashboard/masters/blockEdit/" + id
    this.router.navigateByUrl(url);
  }


}
