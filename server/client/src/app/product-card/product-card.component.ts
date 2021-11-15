import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = {} as Product;
  saveProductIconStatus: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  shareProductBtnClick(){
    alert("Share product");
  }

  wishlistBtnClick(){
    if(this.saveProductIconStatus){
      this.saveProductIconStatus = false;
    }else{
      this.saveProductIconStatus = true;
    }
}


  buyProductBtnClick(){
    alert("Buy Product");
  }

  addToCartBtnClick(){
    alert("Add to cart product");
  }

}
