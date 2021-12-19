import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productCategory = [{}];
  products: any = [];
  searchText: any = "";


  constructor(private productService: ProductService, private searchSearvice: SearchService) { }

  ngOnInit(): void {
   this.productCategory = this.productService.getProductCategory();
   //Get all products from server for the first time by category='all'
   this.getProducts("all");
   this.searchSearvice.getSearchText().subscribe((text)=>{
     this.searchText = text;
   });

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
