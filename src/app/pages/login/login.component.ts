import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FirebaseSSOService } from '../../FirebaseSSOService';
import env from '../../../env-constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: []
})
export class LoginComponent {
  authService = inject(AuthService);

  code = '';
  enteredCode = '';
  newPassword = '';
  confirmPassword = '';
  forgotPasswordEmail: string | null = '';
  showModal = false;
  codeVerified = false; // Дали кодът е потвърден

  loginObj: any = {
    username: '',
    password: ''
  };

  registerObj: any = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  router = inject(Router);

  constructor() { }

  firebaseSSO = inject(FirebaseSSOService);

  onGoogleSignIn() {
    this.firebaseSSO.googleSignIn()
      .then((result) => {
        this.authService.register({
          firstname: result.user.displayName?.split(' ')[0],
          lastname: result.user.displayName?.split(' ')[1],
          email: result.user.email,
          password: result.user.email,
          username: result.user.email
        }).subscribe({
          next: () => {
            this.authService.login({ username: result.user.email, password: result.user.email }).subscribe({
              next: (res) => {
                alert(`Welcome: ${res.username}`);
                this.router.navigateByUrl('/');
              }
            })
          }
        });
        console.log('User info:', result.user);
        this.router.navigateByUrl('/');
      }).catch((err) => {
        console.error('SSO login error:', err);
        alert('Error during SSO login.');
      });
  }

  ssoLogout() {
    this.firebaseSSO.logout().then(() => {
      alert('You have been logged out.');
      this.router.navigateByUrl('/login');
    });
  }

  onLogin() {
    this.authService.login(this.loginObj).subscribe({
      next: (res) => {
        if (res.token && res.username) {
          this.router.navigateByUrl('/');
        }
      },
      error: () => alert('Wrong credentials.')
    });
  }

  onRegister(myRegisterForm: NgForm) {
    if (Object.values(this.registerObj).some((x) => x == '')) {
      alert('All fields are required!');
    } else {
      this.authService.register(this.registerObj).subscribe({
        next: (res) => {
          if (res) {
            alert(`Registration was successful. \nYou can now log in to your account.`);
          } else {
            alert(`Registration was not successful. \nSome duplication data.`);
          }
          myRegisterForm.reset();
        },
        error: (err) => {
          console.error('Error occurred during registration:', err);
          alert(`An error occurred during registration. Please try again later.`);
        }
      });
    }
  }

  generateVerificationCode() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  sendCode() {
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'service_3ltg6do',
        template_id: 'template_68205d8',
        user_id: '4mcFcHDhBtdzgZZVv',
        accessToken: '4-2_W3DzProrN33hrYFVp',
        template_params: {
          to_email: this.forgotPasswordEmail,
          to_code: sessionStorage.getItem('verificationCode')
        }
      })
    }).then(() => {
      alert('Email sent');
    });
  }


  sendCodeHandler() {
    this.forgotPasswordEmail = prompt('Enter email address: ');
    this.code = this.generateVerificationCode();
    sessionStorage.setItem('verificationCode', this.code);


    if (this.forgotPasswordEmail) {
      this.sendCode();

      setTimeout(() => {
        this.showModal = true;
      }, 3000);
    }
  }

  closeModal() {
    this.showModal = false;
    this.enteredCode = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.codeVerified = false;
  }

  verifyCode() {
    if (this.enteredCode === sessionStorage.getItem('verificationCode')) {
      this.codeVerified = true;
    } else {
      alert('Invalid verification code.');
    }
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.authService.editPassword(this.forgotPasswordEmail, this.newPassword)
      .subscribe({
        next: (res) => {
          console.log(res);
          
          alert('Password changed successfully!');
        },
      })

    this.closeModal();
  }
}

