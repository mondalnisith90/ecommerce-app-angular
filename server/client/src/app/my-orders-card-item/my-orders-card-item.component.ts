import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-my-orders-card-item',
  templateUrl: './my-orders-card-item.component.html',
  styleUrls: ['./my-orders-card-item.component.css']
})
export class MyOrdersCardItemComponent implements OnInit {

  @Input() userOrder: any = {};
  productdetails: any = {};
  productDetailsUrl: string = "";
  applicationData: any = null;
  adminId: string = "";

  constructor(private productService: ProductService, private applicationDataService: ApplicationDataService, private userService: UserService, private adminService: AdminService) {
    this.adminId = environment.adminId;
   }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((appData)=>{
      this.applicationData = appData;
    });
    this.productService.getProductById(this.userOrder.productId).subscribe((productData)=>{
      this.productdetails = productData;
      this.productDetailsUrl = `/product-details/${this.userOrder.productId}`;
    });
  }

 

  cancelOrderBtnClick(productId: String){
    if(this.applicationData){
      const req1 = this.userService.updateUserProductDeliveryStatus(this.applicationData.userId, "cancel", this.userOrder._id);
      const req2 = this.adminService.updateUserProductDeliveryStatus(this.adminId, "cancel", this.userOrder._id);

      forkJoin([req1, req2]).subscribe((results) => {
        // alert("Status Change successfully.");
        this.userOrder.delivaryStatus = "cancel";
      },(error)=>{
        alert("Status not update "+error);
      });
    }
    
  }



}
