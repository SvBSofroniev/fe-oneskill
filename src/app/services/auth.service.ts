import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN'
  public readonly USER = 'USER'
  private readonly ROLES = 'ROLES';

  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  private http = inject(HttpClient);
  constructor() { }

  login(user: {
    username: string,
    password: string
  }): Observable<any>{
    return this.http.post('http://localhost:8082/oneskill/auth/login',user)
    .pipe(tap((response: any)=>this.doLoginUser(response.username, response.token, response.roles)));
  }

  private doLoginUser(username: string, token: any, roles: any[]){
    this.loggedUser = username;
    this.storeJwtToken(token);
    this.storeUsername(username);
    this.storeRoles(roles);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string){
    sessionStorage.setItem(this.JWT_TOKEN, jwt);
  }
  private storeUsername(username: string){
    sessionStorage.setItem(this.USER, username);
  }
  private storeRoles(roles: any[]){
    const roleNames = roles.map(role => role.authority);
    sessionStorage.setItem(this.ROLES, JSON.stringify(roleNames));
  }

  logout(){
    sessionStorage.removeItem(this.JWT_TOKEN);
    sessionStorage.removeItem(this.USER);
    sessionStorage.removeItem(this.ROLES);
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
