import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import * as jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Login to the server
   * @param payload 
   */
  public login(payload: { username: string, password: string }) {
    const sub = this.http
      .post(`${environment.apiEndpoint}/login`, payload);
    sub.subscribe((data) => {
      // console.log(JSON.stringify(data));
      if (data["result"]) {
        localStorage.setItem(environment.jwtTokenKey, data["openId"]);
        this.router.navigate(["main"]);
      }
    });
    return sub;
  }
  /**
   * Log out
   */
  public logOut(){
    localStorage.removeItem(environment.jwtTokenKey);
  }

  /**
   * Get the login User info
   */
  public getLoginUserInfo(){
    let jwt = localStorage.getItem(environment.jwtTokenKey);
    return jwtDecode(jwt);
  }


  /**
   * Get the login User info
   */
  public getRoles(){
    return this.getLoginUserInfo().roles;
  }
}
