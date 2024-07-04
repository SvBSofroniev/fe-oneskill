import { Component, OnInit, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { EnrolledCardsComponent } from '../parts/enrolled-cards/enrolled-cards.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EnrolledCardsComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  displayModalEdit: boolean = false;
  displayModalDelete: boolean = false;
  passwordValidation: boolean = false;

  userService = inject(UserServiceService);
  hidePassword: boolean = true;
  editObj: any = {
    "username": "",
    "firstname": "",
    "lastname": "",
    "password": ""
  }

  response = {
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    roles: [],
    createdAt: "",
    updatedAt: ""
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      {
        next: res => {
          this.response = res;
        },
        error: () => alert('Something went wrong')
      }
    );
  }
  get formattedRoles(): string {
    return this.response.roles.map((role: string) => role.toUpperCase()).join(', ');
  }

  validatePassword(): void {
    console.log(this.editObj.password !== '' && this.editObj.password.length < 8);
    
    if(this.editObj.password !== '' && this.editObj.password.length < 8){
      // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      this.passwordValidation = true;
    } else {
      if (!(this.editObj.password.length < 8) || this.editObj.password === '') {
        this.passwordValidation = false;
      }
    }   
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
}

  onEditProfile() {
    if (this.passwordValidation) {
      alert('Invalid password. Password must be at least 8 characters long and include letters, numbers, and special symbols.');
      return;
    }

    this.userService.updateUser(this.editObj).subscribe({
      next: () => {
        this.closeEditModal();
        this.userService.getUserInfo().subscribe(
          {
            next: res => {
              this.response = res;
            },
            error: () => alert('Something went wrong')
          }
        );
      }
    });
  }

  openModalEdit() {
    this.displayModalEdit = true;
  }

  openModalDelete() {
    this.displayModalDelete = true;
  }

  closeEditModal() {
    this.displayModalEdit = false;
  }

  closeModalDelete() {
    this.displayModalDelete = false;
  }

  confirmDelete() {
    console.log('Item deleted');
    this.displayModalDelete = false;
  }

  cancelDelete() {
    this.displayModalDelete = false;
  }

}
