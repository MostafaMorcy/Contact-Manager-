import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private _http: HttpClient, private router:Router) {
  if (localStorage.getItem('userToken') != null) {
    this.saveUserData();
  }
}
userData: any = new BehaviorSubject(null);
  saveUserData() {
    let encodedToken = JSON.stringify(localStorage.getItem('userToken')); // null | string
    let decodedToken: object = jwtDecode(encodedToken); // type string of token
    this.userData.next(decodedToken);
    console.log(this.userData);
  }
userLogin(userData: object):Observable<any>{
  return this._http.post('http://localhost:3000/api/v1/auth/login',userData)
}

logout() {
  localStorage.removeItem('userToken');
  this.userData.next(null);
  this.router.navigate(['/login']);
}
}
