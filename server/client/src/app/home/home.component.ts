import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { HomeService } from '../services/home.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productCategory = [{}];
  products: Product[] = [];


  constructor(private homeService: HomeService, private productService: ProductService) { }

  ngOnInit(): void {
   this.productCategory = this.productService.getProductCategory();
   //Get all products from server for the first time by category='all'
   this.getProducts("all");

  }

 productCategoryBtnClick(productCategory: any){
   const category: string = productCategory.title.toLowerCase();
   this.getProducts(category)

  }

  private getProducts(category: string){
    this.productService.getProductsByCategory(category).subscribe((data)=>{
      console.log(data);
      this.products = data;
    }, (error)=>{
      console.log(error);
    });
  }

 

}
