import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminProductSearch'
})
export class AdminProductSearchPipe implements PipeTransform {

  transform(listItems: any, searchText: any): any {
    searchText = searchText.trim();
    if(!searchText){
      return listItems;
    }
    //Return new filtered list items
    return listItems.filter((item: any)=>{
     return item.name.toLowerCase().includes(searchText.toLowerCase()) || item.catagory.toLowerCase().includes(searchText.toLowerCase())
     || item._id.includes(searchText.toLowerCase()) || item.price.toString().includes(searchText.toLowerCase()) ;
     
    });
  }

}
