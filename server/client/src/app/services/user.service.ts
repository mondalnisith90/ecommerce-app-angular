import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "http://localhost:8002/user/";

  constructor(private httpClient: HttpClient) { }

  userRegistration(user: User): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + "signup", user).pipe(
      catchError(this.handelError)
    );
  }

  userLogin(data: any): Observable<any>{
    return this.httpClient.post<any>(this.baseUrl + "signin", data, {withCredentials: true}).pipe(
      catchError(this.handelError)
    );
}

public placeUserOrder(orderDetails: any): Observable<any>{
  const serverUrl = `${this.baseUrl}order`;
  return this.httpClient.put(serverUrl, orderDetails, {withCredentials: true}).pipe(
    catchError(this.handelError)
  );
}

public getCurrentUserAllOrders(userId: string): Observable<any> {
  const serverUrl = `${this.baseUrl}my-orders`;
  return this.httpClient.get(serverUrl, {withCredentials: true}).pipe(
    catchError(this.handelError)
  );
}

public updateUserProductDeliveryStatus(userId: string, delivaryStatus: string, documentId: string): Observable<any>{
  const serverUrl = `${this.baseUrl}update-delivary-status/${userId}`;
  return this.httpClient.put(serverUrl, {documentId, delivaryStatus}, {withCredentials: true}).pipe(
    catchError(this.handelError)
  );
}

public getUserProfile(): Observable<any> {
  const serverUrl = `${this.baseUrl}/profile`;
  return this.httpClient.get(serverUrl, {withCredentials: true}).pipe(
    catchError(this.handelError)
  );
}

public userLogout(): Observable<any> {
  const serverUrl = `${this.baseUrl}logout`;
  return this.httpClient.get(serverUrl, {withCredentials: true}).pipe(
    catchError(this.handelError)
  );
}

private handelError(error: HttpErrorResponse){
  return throwError(error.error);
}

}
