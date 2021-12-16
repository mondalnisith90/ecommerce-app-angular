import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/Product';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl: string = `http://localhost:8002/products/`;

  private productCategory = [
    {imageUrl: "https://www.clipartmax.com/png/middle/43-432487_cart-clipart-purchase-order-goods-icon.png", title: "All"},
    {imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiIpQeYlEpauv_irmqbB-0vlPIt_5IYJyEZ0ZwoJWmoiPexwyj3eaNQOBJ4XWNIM9hIns&usqp=CAU', title: "Mobile"},
    {imageUrl: 'https://www.800fixing.com/uploads/asus-laptop-repair-dubai.png', title: "Laptop"},
    {imageUrl: 'https://cwpwp2.betterthanpaper.com/wp-content/uploads/2018/11/maxresdefault-2.jpg', title: "Watch"},
    {imageUrl: 'https://www.pngall.com/wp-content/uploads/5/Full-HD-LED-TV-PNG-Clipart.png', title: "TV"},
    {imageUrl: 'https://www.pngitem.com/pimgs/m/247-2474633_transparent-electronics-items-png-png-download.png', title: "Electronics"},
    {imageUrl: 'https://cdn.imgbin.com/2/18/9/imgbin-alpha-industries-ma-1-bomber-jacket-flight-jacket-clothing-jacket-aNaUSynfLRXPiWR2E5UrRUuVK.jpg', title: "Cloths"},
    {imageUrl: 'https://m.media-amazon.com/images/I/71D9ImsvEtL._UY500_.jpg', title: "shoes"},
    {imageUrl: 'https://5.imimg.com/data5/PN/GV/RV/SELLER-66058742/all-grocery-items-500x500.png', title: "Grocery"},
    {imageUrl: 'https://images.theconversation.com/files/369567/original/file-20201116-23-18wlnv.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=668&h=324&fit=crop', title: 'Medicine'},
    {imageUrl: 'https://static-app.444.lk/business-directory/57026/art-jewellery.jpg', title: "Juwalari"},
    {imageUrl: 'https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=590&h=800&D80F3D79-4382-49FA-BE4B4D0C62A5C3ED', title: "Books"}

  ];

  constructor(private httpClient: HttpClient) { }

  public getProductCategory(){
    return this.productCategory;
  }

  public getAllProducts(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.baseUrl + "viewall").pipe(
      catchError(this.handelError)
    );
  }

  public getProductById(productId: string): Observable<Product>{
    // console.log("getProductById() is called...")
    const serverUrl = `${this.baseUrl}search/${productId}`;
    return this.httpClient.get<Product>(serverUrl).pipe(
      catchError(this.handelError)
    );
  }

  public getProductsByCategory(category: string): Observable<Product[]>{
    let serverUrl="";
    if(category != "all"){
       serverUrl = this.baseUrl + `search/category/${category}`;
    }else{
       serverUrl = this.baseUrl + "viewall";
    }
    return this.httpClient.get<Product[]>(serverUrl, {withCredentials: true}).pipe(
      catchError(this.handelError)
    );
  }


  // public getProductWishlist(userId: string): Observable<Array[string]>{
  //   const serverUrl = `${this.baseUrl}`;
  //   return this.httpClient.get(serverUrl, )
  // }

  public performAddToCart(userId: string, productId: string): Observable<User>{
    const serverUrl = `http://localhost:8002/user/add-product/${userId}`;
    return this.httpClient.put<User>(serverUrl, {productId}).pipe(
      catchError(this.handelError)
    );
  }
  
  public removeProductFromCart(userId: string, productId: string): Observable<User> {
    const serverUrl = `http://localhost:8002/user/remove-product/${userId}`;
    return this.httpClient.put<User>(serverUrl, {productId}).pipe(
      catchError(this.handelError)
    );
  }

  public addProductToWishlist(userId: string, productId: string): Observable<User>{
    const serverUrl = `http://localhost:8002/user/add-to-wishlist/${userId}`;
    return this.httpClient.put<User>(serverUrl, {productId}).pipe(
      catchError(this.handelError)
    );
  }

  public removeProductFromWishlist(userId: string, productId: string): Observable<User>{
    const serverUrl = `http://localhost:8002/user/remove-from-wishlist/${userId}`;
    return this.httpClient.put<User>(serverUrl, {productId}).pipe(
      catchError(this.handelError)
    );
  }
   

  private handelError(error: HttpErrorResponse){
    return throwError(error.error);
  }

}
