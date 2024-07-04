import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import env from '../../env-constants'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient);
  public data: any;

  constructor() { 

  }

  editObj: any = {
    "username": "",
    "firstname": "",
    "lastname": "",
    "password": ""
  }

  getUserInfo():Observable<any>{
   const username = sessionStorage.getItem(env.USER);
   const jwtToken = sessionStorage.getItem(env.JWT_TOKEN);
   return this.http.get(`http://localhost:8082/oneskill/users/${username}`,{
      headers:{'Authorization': `Bearer ${jwtToken}`,        'Access-Control-Allow-Origin':"*"
    }});
  }

  getUsersInfo():Observable<any>{
    const jwtToken = sessionStorage.getItem(env.JWT_TOKEN);

    return this.http.get('http://localhost:8082/oneskill/users', {
      headers:{
        'Authorization': `Bearer ${jwtToken}`,
        'Access-Control-Allow-Origin':"*"
    }})
  }

  updateUserRole(username: string, role: string):Observable<any>{
    const jwtToken = sessionStorage.getItem(env.JWT_TOKEN);

    return this.http.patch(`http://localhost:8082/oneskill/users/${username}/roles/${role}`,{}, {
      headers:{'Authorization': `Bearer ${jwtToken}`,        
      'Access-Control-Allow-Origin':"*"
    }});
  }

  updateUser(editObj: any){
    const jwtToken = sessionStorage.getItem(env.JWT_TOKEN);
    const username = sessionStorage.getItem(env.USER);
    return this.http.post(`http://localhost:8082/oneskill/users/${username}/update`,editObj, {
      headers:{'Authorization': `Bearer ${jwtToken}`,        
      'Access-Control-Allow-Origin':"*"
    }});
  }
}
