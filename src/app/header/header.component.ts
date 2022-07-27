import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ChangePasswordComponent } from '../shared/change-password/change-password.component';
import { DynamicDateService } from '../shared/dynamic-date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date:Date | undefined;

  constructor( public dialog: MatDialog) {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
  ngOnInit(): void {
  }

  openDialog() {

    const dialogRef = this.dialog.open(ChangePasswordComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
