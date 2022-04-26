import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicDateService } from '../shared/dynamic-date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  date:Date | undefined; 

  constructor() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
  }
  ngOnInit(): void {
  }

 
}
