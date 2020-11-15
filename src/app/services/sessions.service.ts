import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response } from '../models/response';
import * as humps from 'humps';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  public apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  public signIn(signinForm: any) : Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/sessions/signin`, humps.decamelizeKeys(signinForm)).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public signUp(signupForm: any) : Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/sessions/signup`, humps.decamelizeKeys(signupForm)).pipe(map(res => humps.camelizeKeys(res) as Response))
  }

  public signOut() : Observable<Response> {
    return this.http.delete<Response>(`${this.apiUrl}/sessions/signout`).pipe(map(res => humps.camelizeKeys(res) as Response))
  }
}
