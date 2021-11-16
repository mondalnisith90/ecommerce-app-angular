import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-to-cart-card-item',
  templateUrl: './add-to-cart-card-item.component.html',
  styleUrls: ['./add-to-cart-card-item.component.css']
})
export class AddToCartCardItemComponent implements OnInit {

  @Input() productId: string = ""
  cartProductItem: Product = {} as Product;
  totalProductCount = 1;
  

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe((product)=>{
      // console.log("Add to cart....")
      // console.log(product);
      this.cartProductItem = product;
    }, (error)=>{
      // console.log("Add to cart....")
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

  reduceCartItemBtnClick(){
    alert("Remove Cart item");
  }

}
