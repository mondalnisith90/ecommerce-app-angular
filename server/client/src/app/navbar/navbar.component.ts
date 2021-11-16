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
  totalCartItems: number = 0;


  constructor(private applicationDataService: ApplicationDataService, private router: Router) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      // console.log("Navbar")
      // console.log(data);
      this.loginStatus = data.isAlreadyLogin;
      if(data.userId && data.isAlreadyLogin){
        //Current user is already login
        this.totalCartItems = 0;
        data.myProducts.forEach((productid: string)=>{
          this.totalCartItems++;
        });
      }else{
        this.totalCartItems = 0;
      }
    });
  }

  logoutLinkClick(){
    this.applicationDataService.setAppData({  
    userId: "",
    username: "",
    myProducts: [],
    wishlist: [],
    isAlreadyLogin: false});
    this.router.navigate(['/signin']);
  }

}
