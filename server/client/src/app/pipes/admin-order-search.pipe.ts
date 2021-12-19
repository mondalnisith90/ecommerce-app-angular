import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminOrderSearch'
})
export class AdminOrderSearchPipe implements PipeTransform {

  transform(listItems: any, searchText: any): any {
    searchText = searchText.trim();
    if(!searchText){
      return listItems;
    }
    //Return new filtered list items
    return listItems.filter((item: any)=>{
    // console.log(item.pincode.toString(), item.pincode)
     return item.customerId.includes(searchText.toLowerCase()) || item.productId.toLowerCase().includes(searchText.toLowerCase())
   || item.delivaryAddress.toLowerCase().includes(searchText.toLowerCase()) || item.customerOrderId.includes(searchText.toLowerCase()) 
     || item.pincode.toString().includes(searchText) || item.contactNumber.toString().includes(searchText) || item.price.toString().includes(searchText.toLowerCase()) ;
    });
  }

}
