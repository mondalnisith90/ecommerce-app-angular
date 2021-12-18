import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from './services/application-data.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-app';
  //Fetch user data for first time
  constructor(private applicationDataService: ApplicationDataService, private userService: UserService){

  }

  ngOnInit(): void {
      this.userService.getUserProfile().subscribe((userProfile)=>{
        //User is already login
        const appData = {
          userId: userProfile._id,
          username: userProfile.username,
          cartItems: userProfile.cartItems,
          wishlist: userProfile.wishlist,
          isAlreadyLogin: true,
          userType: userProfile.userType 
        }
        this.applicationDataService.setAppData(appData);
      }, (error)=>{
    //User is not already login
  
      });
  }

}
