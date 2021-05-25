import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  // get current user
  
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }


  // generate-Token

  public generateToken(loginData:any):Observable<any> {
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  // Login user:set token in localStorage

  public loginUser(token) {
    localStorage.setItem("token", token);
   // this.loginStatusSubject.next(true);
    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token")
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null) {
      return false;
    }
    else {
      return true;
    }
  }


  // logout:remove token from localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem('token');
  }

  // set userDetails
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // get User
  public getUser() {
    let userStr = localStorage.getItem('user');
    if(userStr!=null) {
      return JSON.parse(userStr);
    }
    else {
      this.logout();
      return null;
    }
  }

  // get user role

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
