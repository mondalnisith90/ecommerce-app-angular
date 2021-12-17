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
  userType: string = "user";
  totalCartItems: number = 0;


  constructor(private applicationDataService: ApplicationDataService, private router: Router) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      // console.log("Navbar")
      // console.log(data);
      this.loginStatus = data.isAlreadyLogin;
      this.userType = data.userType; //Admin or user
      if(data.userId && data.isAlreadyLogin){
        //Current user is already login
        this.totalCartItems = 0;
        // console.log("Navbar")
        // console.log(data);
        data.cartItems.forEach((cartProductItem: any)=>{
          this.totalCartItems++;
        });
      }else{
        this.totalCartItems = 0;
      }
    });
  }

  userLogoutLinkClick(){
    this.applicationDataService.setAppData({  
    userId: "",
    username: "",
    cartItems: [],
    wishlist: [],
    isAlreadyLogin: false});
    this.router.navigate(['/signin']);
  }

  adminLogoutLinkClick(){
    this.applicationDataService.setAppData({  
      userId: "",
      username: "",
      cartItems: [],
      wishlist: [],
      userType: "user",
      isAlreadyLogin: false});
      this.router.navigate(['/signin']);
  }

}
