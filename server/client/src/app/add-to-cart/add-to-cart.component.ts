import { Component, OnInit } from '@angular/core';
import { ProductCart } from '../models/productCart';
import { ApplicationDataService } from '../services/application-data.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  private appliactionData: any = null;
  cartProducts: Array<ProductCart> = [];


  constructor(private applicationDataService: ApplicationDataService) { }

  ngOnInit(): void {
    this.applicationDataService.getAppData().subscribe((data)=>{
      this.appliactionData = data;
      console.log("ngOnInit() data is called application data is changed..");
      console.log(data)
      this.getAllCartProducts();
    }, (error)=>{

    });
  }

  public getCartProductCount(): number{
    if(this.appliactionData){
      // return this.appliactionData.myProducts.length;
      return this.cartProducts.length;
    }
    return 0;
  }

  public getAllCartProducts(): Array<ProductCart>{
    const myProducts = this.appliactionData.myProducts;
    const productsIdSet = new Set(myProducts);
    this.cartProducts = [];
    productsIdSet.forEach((productId: any)=>{
      let idFrequency = 0;
      myProducts.forEach((id: string)=>{
        if(id===productId){
          idFrequency++;
        }
      });
      this.cartProducts.push({
        productId: productId,
        frequency: idFrequency
      });
    });
    return this.cartProducts;
  }

}
