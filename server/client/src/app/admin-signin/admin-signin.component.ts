import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {

  serverError: string = "";

  adminSigninForm: any ={
    email: "admin@gmail.com",
    password: "123456"
  }


  constructor(private adminService: AdminService, private searchService: SearchService, private router: Router, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
  }

  adminSigninFormSubmit(value: any){
    this.serverError = "";
    this.searchService.setSearchText("");
    this.adminService.adminSignin(value.email, value.password).subscribe((serverData)=>{
      setTimeout(()=>{
        this.router.navigate(['/admin-all-product']);
        this.applicationDataService.setAppData({
          userId: serverData._id,
          username: serverData.userName,
          isAlreadyLogin: true,
          userType: serverData.userType
        });
      }, 1000);
    }, (error)=>{
      this.serverError = error;
    });
  }

}
