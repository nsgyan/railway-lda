import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-serway-list',
  templateUrl: './serway-list.component.html',
  styleUrls: ['./serway-list.component.css']
})
export class SerwayListComponent implements OnInit {

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
