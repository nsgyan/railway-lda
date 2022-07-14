import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-payment-demand-list',
  templateUrl: './payment-demand-list.component.html',
  styleUrls: ['./payment-demand-list.component.css']
})
export class PaymentDemandListComponent implements OnInit {
  beneficiary: any
  constructor(private data: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.beneficiary = this.data.getBeneficiary()
    console.log(this.beneficiary);
    this.data.BeneficiaryChange.subscribe((beneficiary: Beneficiary[]) => {
      this.beneficiary = beneficiary
      console.log(beneficiary);

    })
  }
  addbeneficiary() {
    this.router.navigate(['/dashboard/beneficiary/addBeneficiaries'])
  }

}
