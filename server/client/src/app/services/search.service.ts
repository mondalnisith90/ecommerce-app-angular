import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //This service is used to communicate search  text between two components
 private searchBehaviourSubject: BehaviorSubject<string> = new BehaviorSubject("")

  constructor() { }

  public setSearchText(searchText: string){
    this.searchBehaviourSubject.next(searchText);
  }

  public getSearchText(): Observable<any> {
    return this.searchBehaviourSubject;
  }

}
