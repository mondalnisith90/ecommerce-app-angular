import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-admin-all-product-card',
  templateUrl: './admin-all-product-card.component.html',
  styleUrls: ['./admin-all-product-card.component.css']
})
export class AdminAllProductCardComponent implements OnInit {

  @Input() product: any = {};
  @Output() eventEmiter: EventEmitter<any> = new EventEmitter();

  serverError: string = "";
  productCategoryList: Array<string> = ["none", "mobile", "laptop", "watch", "tv", "electronics", "cloths", "shoes", "grocery", "medicine", "juwalari", "books"];
  selectedProductImage: any = "";
  productDetailsUrl: string = "";

  productForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]), 
    catagory: new FormControl("none"), 
    price: new FormControl("", [Validators.required]), 
    description: new FormControl("", [Validators.required])
  });

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productDetailsUrl = `/product-details/${this.product._id}`;
  }

  editProductBtnClick(productId: string) {
    this.productForm.setValue({...this.productForm.value,
      name: this.product.name,
      catagory: this.product.catagory,
      price: this.product.price,
      description: this.product.description,
    });
  }

  removeProductBtnClick(productId: string) {
    const value = window.confirm("Are you sure to delete this product?");
    if(value){
      this.productService.deleteProduct(productId).subscribe((data)=>{
        this.eventEmiter.emit();
      }, (error)=>{
        alert(error);
      });
    }
  }

  fileInputChange($event: any){
    this.selectedProductImage = $event.target.files[0];
    console.log(this.selectedProductImage);

  }

  productUpdateFormSubmit(){
    if(! this.productForm.invalid){
      this.productService.updateProduct(this.product._id, this.productForm.value).subscribe((serverResponse)=>{
        this.eventEmiter.emit();
        alert("Product update successfully.");
      }, (error)=>{
        this.serverError = error;
        alert("Product not update "+error);
      });
    }
  }

}
