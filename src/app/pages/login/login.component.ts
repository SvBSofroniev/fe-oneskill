import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: []
})
export class LoginComponent {
  authService = inject(AuthService);

  loginObj: any ={
    "username": "",
    "password": ""
  }

  registerObj: any={
    "username": "",
    "firstname": "",
    "lastname": "",
    "email":"",
    "password":""
  }

  router = inject(Router);
  constructor(){
  }

  onLogin(){
    this.authService.login(this.loginObj).subscribe(
      {
        next:res=>{
          if(res.token && res.username){
            this.router.navigateByUrl('/');
          }
        },
        error: ()=> alert('Wrong credentials.')
      }
    );
  }


  onRegister(myRegisterForm: NgForm){
    this.authService.register(this.registerObj).subscribe(
      {
        next:res=>{
          if(res){
            console.log(res);
            
            alert(`Registration was successfull. \nYou can now login to your account.`);
            myRegisterForm.reset();
          }
        }
      }
    )
  }
}
