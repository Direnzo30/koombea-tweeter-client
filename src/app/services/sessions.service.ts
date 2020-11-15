import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import * as humps from 'humps';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  public apiUrl = environment.apiUrl;

  constructor(private http : HttpClient) { }

  public signIn(signinForm: any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, humps.decamelizeKeys(signinForm))
  }

  public signUp(signupForm: any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, humps.decamelizeKeys(signupForm))
  }

  public signOut() : Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/signout`)
  }
}
