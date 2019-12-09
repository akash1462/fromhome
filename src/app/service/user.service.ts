import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../site/user';
import { Observable } from 'rxjs';
import { Mentor } from '../site/mentor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.baseUrl ;
  mentor:Mentor = null;

  users = [  ];

  constructor(private router: Router, private _httpClient: HttpClient) { }
  
  addUser(user: User): Observable<any> {
    console.log("Inside add user of service ")
    console.log(user)  
    //return this._httpClient.post<any>(this.url + "users", user)
    return this._httpClient.post<any>(this.url + "user-service/signUp", user)
    this.router.navigate(['login']);
  }

  addMentor(mentor:Mentor):Observable<any> {
    return this._httpClient.post(this.url + "user-service/addMentor", mentor)
  }



  
}
