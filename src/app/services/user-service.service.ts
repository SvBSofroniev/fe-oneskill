import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient);
  public data: any;

  constructor() { 

  }

  getUserInfo():Observable<any>{
   const username = sessionStorage.getItem('USER');
   const jwtToken = sessionStorage.getItem('JWT_TOKEN');
   return this.http.get(`http://localhost:8082/oneskill/users/${username}`,{
      headers:{'Authorization': `Bearer ${jwtToken}`,        'Access-Control-Allow-Origin':"*"
    }});
  }
}
