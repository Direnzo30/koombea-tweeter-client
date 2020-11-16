import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';
import { Response } from '../models/response';
import * as humps from 'humps';


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

  public getUserProfile(userId: any): Observable<Response> {
    let headers = this.generateAuthHeaders()
    return this.http.get<Response>(`${this.apiUrl}/users/${userId}`, {
      headers: headers
    }).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public getFollowedByUser(pageParams: any) {
    let headers = this.generateAuthHeaders()
    return this.http.get<Response>(`${this.apiUrl}/users/${pageParams.userId}/followed?page=${pageParams.page}&per_page=${pageParams.perPage}`, {
      headers: headers
    }).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public getFollowingUser(pageParams: any) {
    let headers = this.generateAuthHeaders()
    return this.http.get<Response>(`${this.apiUrl}/users/${pageParams.userId}/followers?page=${pageParams.page}&per_page=${pageParams.perPage}`, {
      headers: headers
    }).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public getTweetsByUser(pageParams: any) {
    let headers = this.generateAuthHeaders()
    return this.http.get<Response>(`${this.apiUrl}/tweets/by_user?user_id=${pageParams.userId}&page=${pageParams.page}&per_page=${pageParams.perPage}`, {
      headers: headers
    }).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public followUser(userId: any) {
    let headers = this.generateAuthHeaders()
    return this.http.post<Response>(`${this.apiUrl}/follows`, { followed_id: userId }, {
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
