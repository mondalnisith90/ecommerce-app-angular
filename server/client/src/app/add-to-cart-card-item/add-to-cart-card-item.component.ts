import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-to-cart-card-item',
  templateUrl: './add-to-cart-card-item.component.html',
  styleUrls: ['./add-to-cart-card-item.component.css']
})
export class AddToCartCardItemComponent implements OnInit {

  @Input() productId: string = ""
  cartProductItem: Product = {} as Product;
  applicationData: any = {};
  totalProductCount = 1;
  

  constructor(private productService: ProductService, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe((product)=>{
      // console.log("Add to cart....")
      // console.log(product);
      this.cartProductItem = product;
    }, (error)=>{
      // console.log("Add to cart....")
      console.log(error);
    });
    this.applicationDataService.getAppData().subscribe((data)=>{
      console.log("Cart items data.....")
      console.log(data);
      this.applicationData = data;
    }, (error)=>{
      console.log(error);
    });
  }

  incrementCartCountBtnClick(){
    this.totalProductCount++;
  }

  decreaseCartCountBtnClick(){
    if(this.totalProductCount>1){
      this.totalProductCount--;
    }
  }

  removeCartItemBtnClick(productId: string){
    if(this.applicationData && this.applicationData.userId && this.applicationData.isAlreadyLogin){
      //remove cart item
      this.productService.removeProductFromCart(this.applicationData.userId, productId).subscribe((data)=>{
        console.log("Add To Catr ppppp........");
        console.log(data);
        this.applicationDataService.setAppData({myProducts: data.myProducts});
      }, (error)=>{
        alert("Product not remove from cart "+error);
      });
    }
  }

}
