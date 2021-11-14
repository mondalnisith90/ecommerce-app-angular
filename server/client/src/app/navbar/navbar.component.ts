import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationDataService } from '../services/application-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus: boolean = false;


  constructor(private applicationDataService: ApplicationDataService, private router: Router) { }

  ngOnInit(): void {
    this.applicationDataService.getData().subscribe((data)=>{
      this.loginStatus = data.isAlreadyLogin;
    });
  }

  logoutLinkClick(){
    this.applicationDataService.setData(false);
    this.router.navigate(['/signin']);
  }

}