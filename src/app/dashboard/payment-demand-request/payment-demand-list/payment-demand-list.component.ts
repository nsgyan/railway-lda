import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-payment-demand-list',
  templateUrl: './payment-demand-list.component.html',
  styleUrls: ['./payment-demand-list.component.css']
})
export class PaymentDemandListComponent implements OnInit {
  paymentDemandData: any
  pipe = new DatePipe('en-US');
  constructor(private data: DataService,
    private router: Router,
    private httpservice:HttpsService) {
      this.httpservice.getPaymentdemand().subscribe((data:any)=>{
        this.paymentDemandData=data.getPaymentDemand
        this.paymentDemandData.map((item:any)=>{
          item.date=this.pipe.transform(item.date, 'yyyy-MM-dd');
        })
console.log(this.paymentDemandData)
      })
     }

  ngOnInit(): void {

  }
  addbeneficiary() {
    this.router.navigate(['/dashboard/paymentDemandRequest/add'])
  }

}
