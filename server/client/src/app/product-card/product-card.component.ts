import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = {} as Product;
  saveProductIconStatus: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  shareProductBtnClick(){
    alert("Share product");
  }

  wishlistBtnClick(){
    if(this.saveProductIconStatus){
      this.productService.removeProductFromWishlist("618ce53d86b629dc75ac0a64", this.product._id).subscribe((data)=>{
        console.log(data);
        this.saveProductIconStatus = false;
      }, (error)=>{
        console.log(error);
      });
    }else{
      this.productService.addProductToWishlist("618ce53d86b629dc75ac0a64", this.product._id).subscribe((data)=>{
        console.log(data);
        this.saveProductIconStatus = true;
      }, (error)=>{
        console.log(error);
      });
    }
}


  buyProductBtnClick(){
    alert("Buy Product");
  }

  addToCartBtnClick(){
    console.log(this.product._id)
    this.productService.performAddToCart("618ce53d86b629dc75ac0a64", this.product._id).subscribe((data)=>{
      console.log(data);
      alert("Product is added to your cart");
    }, (error)=>{
      console.log(error);
    });
  }

}
