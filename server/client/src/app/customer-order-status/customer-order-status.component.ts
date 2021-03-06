import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-customer-order-status',
  templateUrl: './customer-order-status.component.html',
  styleUrls: ['./customer-order-status.component.css']
})
export class CustomerOrderStatusComponent implements OnInit {

  customerOrderStatus: string = "pending";
  customerFilteredOrders: any = []; //this array may contains cancel orders or successfull orders or pending orders according to customerOrderStatus.
  searchText: string = "";

  constructor(private activateRoute: ActivatedRoute, private searchService: SearchService, private adminService: AdminService, private applicationDataService: ApplicationDataService) { 
   
  }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((appData)=>{
      if(appData.userType==="admin" && appData.isAlreadyLogin){
        this.searchService.getSearchText().subscribe((text)=>{
          this.searchText = text;
        });

        this.activateRoute.params.subscribe((data)=>{
          this.customerOrderStatus = data.status;
          this.adminService.getAllCustomerorders().subscribe((customerOrders)=>{
           this.customerFilteredOrders = customerOrders.filter((order: any)=>{
                return order.delivaryStatus===this.customerOrderStatus;
            });
          }, (error)=>{
    
          });
        });
      }
    });
  }

}
