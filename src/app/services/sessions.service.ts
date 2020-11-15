import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
import { Response } from '../models/response';
import * as humps from 'humps';
import { join } from 'path';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  public apiUrl = environment.apiUrl;

  constructor(private http : HttpClient,
              public storage: StorageService) { }

  public signIn(signinForm: any) : Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/sessions/signin`, humps.decamelizeKeys(signinForm)).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public signUp(signupForm: any) : Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/sessions/signup`, humps.decamelizeKeys(signupForm)).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public signOut() : Observable<Response> {
    let headers = this.generateAuthHeaders()
    return this.http.delete<Response>(`${this.apiUrl}/sessions/signout`, {
      headers: headers
    }).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public createTweet(tweetForm: any): Observable<Response> {
    let headers = this.generateAuthHeaders()
    return this.http.post<Response>(`${this.apiUrl}/tweets`, humps.decamelizeKeys(tweetForm), {
      headers: headers
    }).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public generateAuthHeaders() {
    let user = this.storage.getUser();
    if (!!user) {
      return new HttpHeaders().set('Authorization', `Bearer ${user['authorizationToken']}`)
    }
    else {
      return new HttpHeaders().set('Authorization', `Bearer `)
    }
  }
}
