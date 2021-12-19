import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  addToCartText: string = "Add to cart";
  removeFromCartText: string = "Remove from cart";
  addToCartButtonCaption: string = this.addToCartText;
  productDetailsUrl: string = "";

  constructor( private applicationDataService: ApplicationDataService, private productService: ProductService, private router: Router ) { }

  ngOnInit(): void {
    this.productDetailsUrl = `/product-details/${this.product._id}`;
    this.applicationDataService.getAppData().subscribe((data)=>{
      this.currentUserData = data;
      if(data.userId){
        //If user is already login
        const currentUserWishList = data.wishlist;
        currentUserWishList.forEach((wishListProduct: any)=>{
          if(wishListProduct.productId === this.product._id){
            this.saveProductIconStatus = true;
          }
        });

        const currentUserCartItems = data.cartItems;
       //Set add to cart button status when card item is loading first time
        currentUserCartItems.forEach((cartProduct: any)=>{
          if(cartProduct.productId === this.product._id){
            //Means this product is present in user cart item list. So change the button caption of add to cart
            this.addToCartButtonCaption = this.removeFromCartText;
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
  }

  wishlistBtnClick(){
    if(this.saveProductIconStatus){
      if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
        //If user is already login, then only he/she can add product to wishlist
      this.productService.removeProductFromWishlist(this.product._id).subscribe((data)=>{
        // console.log(data);
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
      this.productService.addProductToWishlist(this.product._id).subscribe((data)=>{
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


  buyProductBtnClick(productId: string){
    if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin && this.currentUserData.userType==="user"){
      this.router.navigate(['/buy-now'], {queryParams: {productId: productId, quantity: 1}});
    }else{
      this.router.navigate(['/signin']);
    }
  }

  addToCartBtnClick(){
    if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
    if(this.addToCartButtonCaption === this.addToCartText){  
      //If product is added to user cart
    this.productService.performAddToCart(this.product._id).subscribe((data)=>{
   
      this.applicationDataService.setAppData({cartItems: data.cartItems});
      this.addToCartButtonCaption = this.removeFromCartText;
    }, (error)=>{
      console.log(error);
    });
  }else if(this.addToCartButtonCaption === this.removeFromCartText){
    //If product is removed from user cart
    this.productService.removeProductFromCart(this.product._id).subscribe((data)=>{
      this.applicationDataService.setAppData({cartItems: data.cartItems});
      this.addToCartButtonCaption = this.addToCartText;
    }, (error)=>{
      alert("Product not remove from cart "+error);
    });
  }
  }else{
    alert("First signup or login");
  }
  }

}
