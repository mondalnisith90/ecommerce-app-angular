import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  private currentUserData = {
    userId: "",
    username: "",
    myProducts: [],
    wishlist: [],
    isAlreadyLogin: false 
  }
  private applicationData = new BehaviorSubject(this.currentUserData);

  constructor() {   }

  public getAppData(): Observable<any>{
    return this.applicationData;
  }

  public setAppData(data: any){
    this.currentUserData = {...this.currentUserData, ...data};
    this.applicationData.next(this.currentUserData);
  }

}
