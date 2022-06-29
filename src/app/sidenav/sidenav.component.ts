import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }
  logout(){
    localStorage.removeItem('user')
    localStorage.removeItem('username')
  }
  ngOnInit(): void {
  }

}
