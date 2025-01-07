import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import env from '../../env-constants';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false)

  private http = inject(HttpClient);
  constructor() { }

  login(user: {
    username: string | null,
    password: string | null
  }): Observable<any> {
    return this.http.post('http://localhost:8082/oneskill/auth/login', user)
      .pipe(tap((response: any) => this.doLoginUser(response.username, response.token, response.roles)));
  }

  doLoginUser(username: string, token: string, roles: string[]) {
    this.loggedUser = username;
    sessionStorage.setItem(env.JWT_TOKEN, token);
    sessionStorage.setItem(env.USER, username);
    sessionStorage.setItem(env.ROLES, JSON.stringify(roles));
    this.isAuthenticatedSubject.next(true);
  }

  getUserRoles(): string[] {
    let rolesArray = [];
    let rolesString = sessionStorage.getItem(env.ROLES);  
    if (typeof rolesString === 'string') {
      rolesArray = JSON.parse(rolesString);
    }
    return rolesArray;
  }

  logout() {
    sessionStorage.clear()
    this.isAuthenticatedSubject.next(false);
  }


  register(user: {
    firstname: string | undefined,
    lastname: string | undefined,
    email: string | null,
    password: string | null,
    username: string | null
  }): Observable<any> {
    return this.http.post('http://localhost:8082/oneskill/auth/register', user)
      .pipe(tap((response: any) => this.doLoginUser(response.username, response.token, [])));
  }

  editPassword(email: string | null, newPassword: string | undefined): Observable<any> {
    return this.http.patch(`http://localhost:8082/oneskill/auth/reset?email=${email}&password=${newPassword}`, null)
      .pipe(tap((response: any) => console.log(response)));
  }
}
