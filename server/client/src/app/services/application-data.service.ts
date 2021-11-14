import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDataService {

  private applicationData = new BehaviorSubject({ isAlreadyLogin: false });

  constructor() { }

  public getData(): Observable<any>{
    return this.applicationData;
  }

  public setData(loginStatus: boolean){
    this.applicationData.next({isAlreadyLogin: loginStatus});
  }

}
