import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from '../services/application-data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  userWishlist: Array<string> = [];

  constructor(private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((appData)=>{
      // console.log("User wishlist...");
      // console.log(appData);
      if(appData.userId && appData.isAlreadyLogin){
        this.userWishlist = appData.wishlist;
      }else{
        this.userWishlist = [];
      }
    }, (error)=>{
      // console.log("User product wishlist error", error);
      this.userWishlist = [];
    });
  }

  getWishlistLength(): Number{
    return this.userWishlist.length;
  }


  getAllWishlistItems(): Array<string>{
    return this.userWishlist;
  }

}
