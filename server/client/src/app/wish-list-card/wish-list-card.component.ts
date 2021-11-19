import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-wish-list-card',
  templateUrl: './wish-list-card.component.html',
  styleUrls: ['./wish-list-card.component.css']
})
export class WishListCardComponent implements OnInit {

  @Input() productId: string = "";
  product: Product = {} as Product;
  currentUserData: any = null;



  constructor(private productService: ProductService, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe((product)=>{
      console.log(product);
      this.product = product;
      this.applicationDataService.getAppData().subscribe((data)=>{
        this.currentUserData = data;
      });
    }, (error)=>{
      console.log(error);
    });
  }

  buyNowBtnClick(){
    alert("Buy now...");
  }


  removeProductBtnClick(productId: string){
    if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
      //If user is already login, then only he/she can add product to wishlist
    this.productService.removeProductFromWishlist(this.currentUserData.userId, this.product._id).subscribe((data)=>{
      console.log(data);
      // this.saveProductIconStatus = false;
      if(this.currentUserData && this.currentUserData.userId && this.currentUserData.isAlreadyLogin){
        this.applicationDataService.setAppData({wishlist: data.wishlist});
      }
    }, (error)=>{
      console.log(error);
    });
  }
  }

}
