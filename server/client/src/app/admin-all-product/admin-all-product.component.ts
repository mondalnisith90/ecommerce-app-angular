import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-all-product',
  templateUrl: './admin-all-product.component.html',
  styleUrls: ['./admin-all-product.component.css']
})
export class AdminAllProductComponent implements OnInit {

  productCategory: Array<object> = [];
  allProducts: Array<object> = [];
  errorStatus: boolean = false;
  category: string = "all";

  constructor(private productService: ProductService, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((appData)=>{
      if(appData.isAlreadyLogin && appData.userType==="admin"){
        this.productCategory = this.productService.getProductCategory();
        this.getProducts("all");
      }else{
        this.errorStatus = true;
      }
    });
  }


  productCategoryBtnClick(productCategory: any){
    const category: string = productCategory.title.toLowerCase();
    this.category = category;
    this.getProducts(category);
 
   }
 
 getProducts(category: string){
     this.productService.getProductsByCategory(category).subscribe((data)=>{
       this.allProducts = data;
     }, (error)=>{
      //  console.log(error);
     });
   }

}
