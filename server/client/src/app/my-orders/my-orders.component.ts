import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from '../services/application-data.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  currentUserOrderList: Array<Object> = [];

  constructor(private userService: UserService, private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((appData)=>{
      if(appData.isAlreadyLogin && appData.userType==="user"){
        this.userService.getCurrentUserAllOrders(appData.userId).subscribe((orders)=>{
          this.currentUserOrderList = orders.orderItems;
        }, (error)=>[

        ]);
      }
    });
  }

}
