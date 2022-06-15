import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/shared/data.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  Project: any
  constructor(private data: DataService,
    private router: Router) { }

  ngOnInit(): void {
    this.Project = this.data.getProject()
    console.log(this.Project);
    this.data.BeneficiaryChange.subscribe((beneficiary: Beneficiary[]) => {
      this.Project = beneficiary
      console.log(beneficiary);

    })
  }
  addProject() {
    this.router.navigate(['/dashboard/project/add'])
  }

}
