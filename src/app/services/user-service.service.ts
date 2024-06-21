import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private username: any;
  constructor() { }

  useObject: any ={
    "firstName": "",
    "lastName": "",
    "email":"",
    "username":"",
    "createdAt":"",
    "updatedAt":""
  }

  getUserInfo(){
   this.username = sessionStorage.getItem(this.authService.USER)

    this.http.get('http://localhost:8082/onskill/users', this.username).subscribe(
      {
        next:res=>{
          console.log(res);
          
        },
        error: ()=> alert('Wrong credentials.')
      }
    );
  }

}
