import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  public readonly USER = 'USER'
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  private http = inject(HttpClient);
  constructor() { }

  login(user: {
    username: string,
    password: string
  }): Observable<any>{
    return this.http.post('http://localhost:8082/oneskill/auth/login',user)
    .pipe(tap((response: any)=>this.doLoginUser(response.username, response.token)));
  }

  private doLoginUser(username: string, token: any){
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.storeUsername(username);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string){
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }
  private storeUsername(username: string){
    sessionStorage.setItem(this.USER, username);
  }

  logout(){
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.USER);
    this.isAuthenticatedSubject.next(false);
  }


  register(user: {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    username: string
  }): Observable<any>{
    return this.http.post('http://localhost:8082/oneskill/auth/register',user)
    .pipe(tap((response: any)=>console.log(response)));
  }
}
