import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(listItems: any, searchText: any) {
    searchText = searchText.trim();
    if(!searchText){
      return listItems;
    }
    //Return new filtered list items
    return listItems.filter((item: any)=>{
     return item.name.toLowerCase().includes(searchText.toLowerCase()) || item.catagory.toLowerCase().includes(searchText.toLowerCase())
     || item.description.toLowerCase().includes(searchText.toLowerCase()) || item.price.toString().includes(searchText.toLowerCase()) ;
     
    });
   
  }

}
