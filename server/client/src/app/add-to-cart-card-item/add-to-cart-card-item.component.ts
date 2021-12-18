import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductCart } from '../models/productCart';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-to-cart-card-item',
  templateUrl: './add-to-cart-card-item.component.html',
  styleUrls: ['./add-to-cart-card-item.component.css']
})
export class AddToCartCardItemComponent implements OnInit {

  @Input() cartProduct: any = {};
  cartProductItem: Product = {} as Product;
  applicationData: any = {};
  totalProductCount = 1;
  
  

  constructor(private productService: ProductService, private applicationDataService: ApplicationDataService, private router: Router) {}

  ngOnInit(): void {
    this.totalProductCount = this.cartProduct.quentity;
    this.productService.getProductById(this.cartProduct.productId).subscribe((product)=>{
      this.cartProductItem = product;
    }, (error)=>{
      console.log(error);
    });

    this.applicationDataService.getAppData().subscribe((data)=>{
      this.applicationData = data;
    }, (error)=>{
      console.log(error);
    });
  }

  incrementCartCountBtnClick(){
    this.productService.changecartproductQuentity(this.cartProduct.productId, this.totalProductCount+1).subscribe((data)=>{
      this.totalProductCount++;
      this.applicationDataService.setAppData({
        cartItems: data.cartItems
      });
    });
  }

  decreaseCartCountBtnClick(){
    if(this.totalProductCount>1){
      this.productService.changecartproductQuentity(this.cartProduct.productId, this.totalProductCount-1).subscribe((data)=>{
        this.totalProductCount--;
        this.applicationDataService.setAppData({
          cartItems: data.cartItems
        });
      });
    }
  }

  removeCartItemBtnClick(productId: string){
    if(this.applicationData && this.applicationData.userId && this.applicationData.isAlreadyLogin){
      //remove cart item
      this.productService.removeProductFromCart(productId).subscribe((data)=>{
        this.applicationDataService.setAppData({cartItems: data.cartItems});
      }, (error)=>{
        alert("Product not remove from cart "+error);
      });
    }
  }

  buyNowBtnClick(productId: string){
    this.router.navigate(['/buy-now'], {queryParams: {productId: productId, quantity: this.totalProductCount}});
  }

}
