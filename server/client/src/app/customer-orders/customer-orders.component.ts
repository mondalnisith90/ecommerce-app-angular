import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

  applicationData: any = null;
  allCustomerOrders: any = [];

  constructor(private adminService: AdminService, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      this.applicationData = data;
      if(this.applicationData.userId){
        this.adminService.getAllCustomerorders(this.applicationData.userId).subscribe((serverData)=>{
          console.log(serverData)
          this.allCustomerOrders = serverData.customerOders;
        }, (error)=>{

        });

      }

    });
  }

}
