import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loginStatus: boolean = false;
  userType: string = "user";
  userName: string = "";
  totalCartItems: number = 0;


  constructor(private applicationDataService: ApplicationDataService, private userService: UserService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      // console.log("Navbar")
      // console.log(data);
      this.loginStatus = data.isAlreadyLogin;
      this.userName = data.username;
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
    this.userService.userLogout().subscribe((serverData)=>{
      this.applicationDataService.setAppData({  
        userId: "",
        username: "",
        cartItems: [],
        wishlist: [],
        isAlreadyLogin: false});
        this.router.navigate(['/signin']);
    }, (error)=>{
      alert(error);
    });
  }

  adminLogoutLinkClick(){
    this.adminService.adminLogout().subscribe((serverData)=>{
      this.applicationDataService.setAppData({  
        userId: "",
        username: "",
        cartItems: [],
        wishlist: [],
        userType: "user",
        isAlreadyLogin: false});
        this.router.navigate(['/admin-signin']);
    }, (error)=>{
      alert(error);
    });
  }

  navbarSearchButtonClick(searchValue: string){
    this.router.navigate(['/']);
  }

}
