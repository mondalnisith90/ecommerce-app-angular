import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {

  productId: string = "";
  productDetails: any = {};
  productQuantity: number = 1;
  serverErrorStatus: boolean = false;
  applicationData: any = null;
  adminId: string = "";

  deliveryAddressForm: FormGroup = new FormGroup({
    delivaryAddress: new FormControl("", [Validators.required]),
    pincode: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")]),
    contactNumber: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });

  constructor(private productService: ProductService, private router: Router, private userService: UserService, private adminService: AdminService, private applicationDataService: ApplicationDataService, private activatedRoute: ActivatedRoute) {
    //Query parameters
    this.activatedRoute.queryParams.subscribe((data)=>{
      this.productId = data.productId;
      this.productQuantity = data.quantity;
    });
    this.adminId = environment.adminId;
   }

  ngOnInit(): void {
    // console.log(this.activatedRoute.snapshot.params);
    this.productService.getProductById(this.productId).subscribe((productDetails)=>{
      this.productDetails = productDetails;
    }, (error)=>{
      this.serverErrorStatus = true;
    });

    this.applicationDataService.getAppData().subscribe((appData)=>{
      this.applicationData = appData;
    });


  }
  deliveryAddressFormSubmit(){
    console.log(this.deliveryAddressForm.value);
    // this.router.navigate(['/my-orders'])


  }

  incrementItemCountBtnClick(){
    this.productQuantity++;

  }

  decreaseItemCountBtnClick(){
    if(this.productQuantity>1){
      this.productQuantity--;
    }
  }

  placeOrder(productId: string){
    if(productId && this.applicationData && this.applicationData.userId && this.applicationData.userType==="user" && this.applicationData.isAlreadyLogin){
      let orderDetails = {
          productId: productId, 
          price: this.productDetails.price*this.productQuantity, 
          quentity: this.productQuantity, 
          delivaryAddress: this.deliveryAddressForm.value.delivaryAddress, 
          pincode: this.deliveryAddressForm.value.pincode, 
          contactNumber: this.deliveryAddressForm.value.contactNumber
      }

   


    this.userService.placeUserOrder(orderDetails).subscribe((orderData)=>{
      const orderId = orderData._id;
      let orderDetailsForAdmin = {
        customerId: this.applicationData.userId,
        productId: productId, 
        customerOrderId: orderId,
        price: this.productDetails.price*this.productQuantity, 
        quentity: this.productQuantity, 
        delivaryAddress: this.deliveryAddressForm.value.delivaryAddress, 
        pincode: this.deliveryAddressForm.value.pincode, 
        contactNumber: this.deliveryAddressForm.value.contactNumber
    }
      this.adminService.addCustomerOrderOnAdmin(this.adminId, orderDetailsForAdmin).subscribe((data)=>{
       this.router.navigateByUrl('/my-orders');
        alert("Your order place successfully.");
      }, (error)=>{
        alert("Order not placed, error: "+error);
      });
     }, (error)=>{
      alert("Order not placed, error: "+error);
     });
    }
  }

}
