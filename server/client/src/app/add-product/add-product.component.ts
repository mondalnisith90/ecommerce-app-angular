import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  serverError: string = "";
  productCategoryList: Array<string> = ["none", "mobile", "laptop", "watch", "tv", "electronics", "cloths", "shoes", "grocery", "medicine", "juwalari", "books"];
  selectedProductImage: any = "";

  productForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]), 
    catagory: new FormControl("none"), 
    price: new FormControl("", [Validators.required]), 
    description: new FormControl("", [Validators.required]), 
    imgUrl: new FormControl("", [Validators.required])
  });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {

  }

  fileInputChange($event: any){
    this.selectedProductImage = $event.target.files[0];
    console.log(this.selectedProductImage);

  }


  productFormSubmit(){
    if(! this.productForm.invalid){
      this.productService.addNewProduct(this.productForm.value).subscribe((serverResponse)=>{
        console.log(serverResponse);
        this.productForm.reset();
      }, (error)=>{
        this.serverError = error;
        alert("Product not added "+error);
      });
    }
  }

}
