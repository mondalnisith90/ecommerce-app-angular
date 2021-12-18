import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';


@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

 

  constructor() { }

  ngOnInit(): void {
  
  }

}
