import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 baseUrl: string = `http://localhost:8002/admin`;

  constructor(private httpClient: HttpClient) { }

  public adminSignin(email: string, password: string): Observable<any>{
    const serverUrl = `${this.baseUrl}/signin`
    return this.httpClient.post(serverUrl, {email, password}, {withCredentials: true}).pipe(
      catchError(this.handelError)
    );
  }

  public getAllCustomerorders(userId: string): Observable<any>{
    const serverUrl = `${this.baseUrl}/all-customer-orders/${userId}`;
    return this.httpClient.get(serverUrl, {withCredentials: true}).pipe(
      catchError(this.handelError)
    );
  }

  public addCustomerOrderOnAdmin(adminId: any, orderDetails: any): Observable<any>{
    const serverUrl = `${this.baseUrl}/add-customer-order/${adminId}`;
    return this.httpClient.put(serverUrl, orderDetails, {withCredentials: true}).pipe(
      catchError(this.handelError)
    );
  }

  public getCustomerAllOrders(adminId: string): Observable<any> {
    const serverUrl = `${this.baseUrl}/customer-orders/${adminId}`;
    return this.httpClient.get(serverUrl).pipe(
      catchError(this.handelError)
    );
  }

  public updateUserProductDeliveryStatus(adminId: string, delivaryStatus: string, customerOrderId: string): Observable<any>{
    const serverUrl = `${this.baseUrl}/update-delivary-status/${adminId}`;
    return this.httpClient.put(serverUrl, {customerOrderId, delivaryStatus}, {withCredentials: true}).pipe(
      catchError(this.handelError)
    );
  }

  private handelError(error: HttpErrorResponse){
    return throwError(error.error);
  }

}
