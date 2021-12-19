import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: string = "";
  productDetails: any = {};
  applicationData: any = {};
  invalidProductId: boolean = false;
  addToCartText: string = "Add to cart";
  removeFromCartText: string = "Remove from cart";
  addToCartButtonCaption: string = this.addToCartText;
  addToWishlist: string = "Add to wishlist";
  removeFromWishlist: string = "Remove from wishlist";
  wishlistButtonCaption: string = this.addToWishlist;

  constructor(private productService: ProductService, private router: Router, private applicationDataService: ApplicationDataService, private activatedRouter: ActivatedRoute) { 
    this.productId = this.activatedRouter.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe((productDetails)=>{
      this.productDetails = productDetails;
    }, (error)=>{
      this.invalidProductId = true;
    });
    
    this.applicationDataService.getAppData().subscribe((appData)=>{
      this.applicationData = appData;
      const currentUserWishList = appData.wishlist;
      currentUserWishList.forEach((wishListProduct: any)=>{
        if(wishListProduct.productId === this.productId){
          this.wishlistButtonCaption = this.removeFromWishlist;
        }
      });

      const currentUserCartItems = appData.cartItems;
      //Set add to cart button status when card item is loading first time
       currentUserCartItems.forEach((cartProduct: any)=>{
         if(cartProduct.productId === this.productId){
           //Means this product is present in user cart item list. So change the button caption of add to cart
           this.addToCartButtonCaption = this.removeFromCartText;
         }
       });
    });
  }

  buyProductBtnClick(productId: string){
    if(this.applicationData && this.applicationData.isAlreadyLogin && this.applicationData.userType==="user" && this.applicationData.userId){
      this.router.navigate(['/buy-now'], {queryParams: {productId: productId, quantity: 1}});
    }else{
      this.router.navigate(['/signin']);
    }
  }

  addToWishlistBtnClick(productId: string){
    if(this.applicationData && this.applicationData.isAlreadyLogin && this.applicationData.userType==="user" && this.applicationData.userId){
      if(this.wishlistButtonCaption === this.removeFromWishlist){
          //If user is already login, then only he/she can add product to wishlist
        this.productService.removeProductFromWishlist(this.productDetails._id).subscribe((data)=>{
          this.wishlistButtonCaption = this.addToWishlist;
            this.applicationDataService.setAppData({wishlist: data.wishlist});
        }, (error)=>{
          console.log(error);
        });

      }else{
        this.productService.addProductToWishlist(this.productDetails._id).subscribe((data)=>{
          this.wishlistButtonCaption = this.removeFromWishlist;
            this.applicationDataService.setAppData({wishlist: data.wishlist});
        }, (error)=>{
          console.log(error);
        });
     
      }
    }else{
      this.router.navigate(['/signin']);
    }
  }

  addToCartBtnClick(productId: string){
    if(this.applicationData && this.applicationData.isAlreadyLogin && this.applicationData.userType==="user" && this.applicationData.userId){
        if(this.addToCartButtonCaption === this.addToCartText){  
          //If product is added to user cart
        this.productService.performAddToCart(this.productDetails._id).subscribe((data)=>{
       
          this.applicationDataService.setAppData({cartItems: data.cartItems});
          this.addToCartButtonCaption = this.removeFromCartText;
        }, (error)=>{
          console.log(error);
        });
      }else if(this.addToCartButtonCaption === this.removeFromCartText){
        //If product is removed from user cart
        this.productService.removeProductFromCart(this.productDetails._id).subscribe((data)=>{
          this.applicationDataService.setAppData({cartItems: data.cartItems});
          this.addToCartButtonCaption = this.addToCartText;
        }, (error)=>{
          alert("Product not remove from cart "+error);
        });
      }
      
    }else{
      this.router.navigate(['/signin']);
    }
  }

}
