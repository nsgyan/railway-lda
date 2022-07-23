import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-beneficiary-list-view',
  templateUrl: './beneficiary-list-view.component.html',
  styleUrls: ['./beneficiary-list-view.component.css']
})
export class BeneficiaryListViewComponent implements OnInit {
  beneficiary: any
  constructor(private data: DataService,
    private router: Router,
    private httpService: HttpsService,
    private toast: ToastrService,) {
    this.httpService.getBeneficiary().subscribe((data: any) => {
      this.beneficiary = data.getBeneFiciary

    })
  }

  ngOnInit(): void {
    // this.beneficiary = this.data.getBeneficiary()
    // console.log(this.beneficiary);
    // this.data.BeneficiaryChange.subscribe((beneficiary: Beneficiary[]) => {
    //   this.beneficiary = beneficiary
    //   console.log(beneficiary);

    // })
  }
  addbeneficiary() {
    this.router.navigate(['/dashboard/beneficiary/addBeneficiaries'])
  }
  delete(id: any) {
    this.httpService.delBeneficiary(id).subscribe(res => {
      this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])
      this.toast.success('Deleted Beneficiary successfully')
    }, err => {
      this.toast.error('Internal server error')
    })
  }
  edit(id: any) {
    let url = '/dashboard/beneficiary/edit/' + id
    this.router.navigate([url])
  }
  view(id:any){
    let url = '/dashboard/beneficiary/view/' + id
    this.router.navigate([url])
  }


}
