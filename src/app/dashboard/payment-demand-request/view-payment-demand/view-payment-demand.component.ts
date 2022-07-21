import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-view-payment-demand',
  templateUrl: './view-payment-demand.component.html',
  styleUrls: ['./view-payment-demand.component.css']
})
export class ViewPaymentDemandComponent implements OnInit {


  state:any=[]
  pipe = new DatePipe('en-US');
  id: string | null;
  paymentDemandData: any;





    constructor( private fb:FormBuilder,
      private route:ActivatedRoute,
      private router: Router,
      private data: DataService,
      private httpService:HttpsService,
      private toast: ToastrService,
      public dialog: MatDialog) {
this.id=this.route.snapshot.paramMap.get('id')
this.httpService.getPaymentdemandByID(this.id).subscribe((data:any)=>{
  this.paymentDemandData=data.findPaymentDemand
  // this.project=data.projects
})





      }

    ngOnInit(): void {


      // this.httpService.getBeneficiary().subscribe((data: any) => {
      //   this.beneficiaryData = data.getBeneFiciary
      //   this.beneficiaryData.map((item:any)=>{
      //     this.beneficiarylist.push({
      //       _id: item._id,
      //       name: item.beneficiaryName
      //     })
      //   })

      // })
      // this.beneficiarylist = [
      //   { _id: "1", name: "New Delhi" },
      //   { _id: "2", name: "Mumbai" },
      //   { _id: "3", name: "Bangalore"},
      //   { _id: "4", name: "Pune" },
      //   { _id: "5", name: "Chennai" },
      //   { _id: "6", name: "Navsari" }
      // ];




      // this.addbeneficiary()
    }


















    cancel() {
      this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])

  }




  

  }
