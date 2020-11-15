import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    
  }

  getBehavUser() {
    let user = this.getUser();
    this.currentUser.next(user);
    return this.currentUser.asObservable()
  }

  storeUser(user: User) : void {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser.next(user);
  }

  getUser() {
    let user = localStorage.getItem('currentUser');
    if (!!user) {
      return JSON.parse(user);
    }
    return null
  }

  deleteUser() {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
  }
}
