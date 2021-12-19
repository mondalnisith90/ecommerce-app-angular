import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { ApplicationDataService } from '../services/application-data.service';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {

 

  constructor(private router: Router, private searchResvice: SearchService) { }

  ngOnInit(): void {
  
  }

  tabClick(event: any){
    const tabIndex = event.index;
    if(tabIndex===0){
      this.router.navigate(['/customer-oders/status/pending']);
    }else if(tabIndex===1){
      this.router.navigate(['/customer-oders/status/successfull']);
    }else{
      this.router.navigate(['/customer-oders/status/cancel']);
    }
  }

  searchBarButtonClick(searchText: string){
     this.searchResvice.setSearchText(searchText);
  }

}
