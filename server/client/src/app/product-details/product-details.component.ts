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
    });
  }

  buyProductBtnClick(productId: string){
    if(this.applicationData && this.applicationData.isAlreadyLogin && this.applicationData.userType==="user" && this.applicationData.userId){
      alert("Buy now...");
    }else{
      this.router.navigate(['/signin']);
    }
  }

  addToWishlistBtnClick(productId: string){
    if(this.applicationData && this.applicationData.isAlreadyLogin && this.applicationData.userType==="user" && this.applicationData.userId){
      alert("Add to wishlist...");
    }else{
      this.router.navigate(['/signin']);
    }
  }

  addToCartBtnClick(productId: string){
    if(this.applicationData && this.applicationData.isAlreadyLogin && this.applicationData.userType==="user" && this.applicationData.userId){
      alert("Add to cart...");
    }else{
      this.router.navigate(['/signin']);
    }
  }

}
