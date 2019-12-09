import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _httpClient: HttpClient, private userService: UserService, public router: Router) { }

  private authenticationApiUrl = environment.baseUrl;
  private token: string;
  username: string;
  add: boolean = false;
  loggedInUser = { loggedOut: true };
  redirectUrl = '/';
  loggedIn: boolean = false;
  user:boolean = false;
  mentor:boolean = false;
  vendor_type:string;
  id:number;
  type:string;

  validCredentials: boolean = true;

  public setToken(token: string) {
    this.token = token;
  }
  public getToken() {
    return this.token;
  }


  authenticate(user: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + btoa(user + ':' + password));
    //return this._httpClient.get(this.authenticationApiUrl + "authenticate", { headers })
    return this._httpClient.get(this.authenticationApiUrl + "authentication-service/authenticate", { headers })
  }

  authenticateUser(user) {
    for (let validUser of this.userService.users) {
      if (validUser.username == user.username && validUser.password == user.password) {
        this.loggedInUser = user;
        this.validCredentials = true;
        this.add = true;

        this.router.navigate(['Menu']);
        this.loggedIn = true;
      }
      else
        this.validCredentials = false;
    }
  }

  logout() {
    this.loggedInUser = { loggedOut: true };
    this.loggedIn = false;
    this.router.navigate(['login']);


  }
}
