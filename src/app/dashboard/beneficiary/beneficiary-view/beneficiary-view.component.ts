import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { panValidation, CellNumValidation } from 'src/app/shared/custom-validation.service';
import { DataService } from 'src/app/shared/data.service';
import { HttpsService } from 'src/app/shared/https.service';

@Component({
  selector: 'app-beneficiary-view',
  templateUrl: './beneficiary-view.component.html',
  styleUrls: ['./beneficiary-view.component.css']
})
export class BeneficiaryViewComponent implements OnInit {

    beneficiaryData: any;
  id: string | null;
    constructor( private fb:UntypedFormBuilder,
      private router: Router,
      private httpService:HttpsService,
      private toast: ToastrService,
      private route:ActivatedRoute) {
   
        this.id = this.route.snapshot.paramMap.get('id')
    
        
        this.httpService.getBeneficiaryByID(this.id).subscribe((data: any) => {
  this.beneficiaryData=data.data
     
  
  
  
        })
  
  
      }
  
    ngOnInit(): void {
  
    }
  

    cancel() {
      this.router.navigate(['/dashboard/beneficiary/beneficiariesList'])
  
  }
  }
  