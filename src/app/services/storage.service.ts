import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  storeUser(user: User) : void {
    localStorage.removeItem('currentUser');
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser() {
    let user = localStorage.getItem('currentUser');
    if (!!user) {
      return JSON.parse(user);
    }
    return null
  }
}
