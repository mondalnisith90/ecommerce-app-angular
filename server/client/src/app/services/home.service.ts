import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private productCategory = [
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIpQeYlEpauv_irmqbB-0vlPIt_5IYJyEZ0ZwoJWmoiPexwyj3eaNQOBJ4XWNIM9hIns&usqp=CAU', title: "Mobile"},
    {imageUrl: 'https://www.800fixing.com/uploads/asus-laptop-repair-dubai.png', title: "Laptop"},
    {imageUrl: 'https://www.pngall.com/wp-content/uploads/5/Full-HD-LED-TV-PNG-Clipart.png', title: "TV"},
    {imageUrl: 'https://cdn.imgbin.com/2/18/9/imgbin-alpha-industries-ma-1-bomber-jacket-flight-jacket-clothing-jacket-aNaUSynfLRXPiWR2E5UrRUuVK.jpg', title: "Cloths"},
    {imageUrl: 'https://www.pngitem.com/pimgs/m/247-2474633_transparent-electronics-items-png-png-download.png', title: "Electronics"},
    {imageUrl: 'https://lh3.googleusercontent.com/proxy/PQ49PPZvRTv374F0l0DUKWsXrrHuG1Rzk-pELHIbO2P2hFUVK0B3r4Jo2MNZ6WNiBiUyoFIYcrXiaJqgbJHZKAjaj3F3RkSE8xgPYRGVm-I7tP9KAtuJo0hjCPYLbdc7KrAQ7tCEIw', title: "Grocery"},
    {imageUrl: 'https://static-app.444.lk/business-directory/57026/art-jewellery.jpg', title: "Juwalari"},
    {imageUrl: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED', title: "Books"}

  ];

  constructor(private httpClient: HttpClient) { }

  public getProductCategory(){
    return this.productCategory;
  }

}
