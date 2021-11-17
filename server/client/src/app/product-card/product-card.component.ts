import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { User } from '../models/user';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = {} as Product;
  saveProductIconStatus: boolean = false;
  currentUserData: any = null;

  constructor( private applicationDataService: ApplicationDataService, private productService: ProductService ) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      this.currentUserData = data;
      if(data.userId){
        //If user is already login
        // console.log("Product card...");
        // console.log(data);
        const currentUserWishList = data.wishlist;
        currentUserWishList.forEach((productId: string)=>{
          if(productId === this.product._id){
            this.saveProductIconStatus = true;
          }
        });
      }else{
        this.saveProductIconStatus = false;
      }
    }, (error)=>{
      // console.log("Product card error "+error);
      this.saveProductIconStatus = false;
    });
  }

  shareProductBtnClick(){
    alert("Share product");
  }

  wishlistBtnClick(){
    if(this.saveProductIconStatus){
      if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
        //If user is already login, then only he/she can add product to wishlist
      this.productService.removeProductFromWishlist(this.currentUserData.userId, this.product._id).subscribe((data)=>{
        console.log(data);
        this.saveProductIconStatus = false;
        if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
          this.applicationDataService.setAppData({wishlist: data.wishlist});
        }
      }, (error)=>{
        console.log(error);
      });
    }else{
      alert("First signup or login");
    }
    }else{
      if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
      this.productService.addProductToWishlist(this.currentUserData.userId, this.product._id).subscribe((data)=>{
        console.log(data);
        this.saveProductIconStatus = true;
        if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
          this.applicationDataService.setAppData({wishlist: data.wishlist});
        }
      }, (error)=>{
        console.log(error);
      });
    }else{
      alert("First signup or login");
    }
    }
}


  buyProductBtnClick(){
    alert("Buy Product");
  }

  addToCartBtnClick(){
    if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
    this.productService.performAddToCart(this.currentUserData.userId, this.product._id).subscribe((data)=>{
      console.log(data);
      alert("Product is added to your cart");
      this.applicationDataService.setAppData({myProducts: data.myProducts});
    }, (error)=>{
      console.log(error);
    });
  }else{
    alert("First signup or login");

  }
  }

}
