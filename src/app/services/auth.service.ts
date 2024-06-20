import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  private http = inject(HttpClient);
  constructor() { }

  login(user: {
    username: string,
    password: string
  }): Observable<any>{
    return this.http.post('http://localhost:8082/oneskill/auth/login', user)
    .pipe(tap((response: any)=>this.doLoginUser(user.username, response.token)));
  }

  private doLoginUser(username: string, token: any){
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string){
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }

  logout(){
    sessionStorage.removeItem(this.JWT_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }
}
