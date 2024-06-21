import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
}
