import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-customer-orders-card-item',
  templateUrl: './customer-orders-card-item.component.html',
  styleUrls: ['./customer-orders-card-item.component.css']
})
export class CustomerOrdersCardItemComponent implements OnInit {

  @Input() customerOrder: any = {};
  productdetails: any = {};
  productDetailsUrl: string = "";
  applicationData: any = null;

  constructor(private productService: ProductService, private userService: UserService, private adminService: AdminService, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((appData)=>{
      this.applicationData = appData;
    });
    this.productService.getProductById(this.customerOrder.productId).subscribe((productData)=>{
      this.productdetails = productData;
      this.productDetailsUrl = `/product-details/${productData._id}`;
    });
  }

  alreadyDeliverBtnClick(){
    if(this.applicationData){
    const req1 = this.userService.updateUserProductDeliveryStatus(this.customerOrder.customerId, "successfull", this.customerOrder.customerOrderId);
    const req2 = this.adminService.updateUserProductDeliveryStatus(this.applicationData.userId, "successfull", this.customerOrder.customerOrderId);

    forkJoin([req1, req2]).subscribe((results) => {
      alert("Status Change successfully.");
      this.customerOrder.delivaryStatus = "successfull";
    },(error)=>{
      alert("Status not update "+error);
    });
  }
}

}
