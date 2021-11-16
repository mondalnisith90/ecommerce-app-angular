import { Component, OnInit } from '@angular/core';
import { ApplicationDataService } from '../services/application-data.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  private appliactionData: any = null;

  constructor(private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      this.appliactionData = data;
    }, (error)=>{

    });
  }

  public getCartProductCount(): number{
    if(this.appliactionData){
      return this.appliactionData.myProducts.length;
    }
    return 0;
  }

  public getAllCartProducts(): Array<string>{
    return this.appliactionData.myProducts;
  }

}
