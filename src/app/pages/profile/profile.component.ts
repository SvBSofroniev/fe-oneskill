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

  userService = inject(UserServiceService);

  editObj: any = {
    "username": "",
    "firstname": "",
    "lastname": "",
    "email": "",
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

  onEditProfile() {
    console.log(this.editObj);
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
    // Implement delete logic here
    console.log('Item deleted');
    this.displayModalDelete = false;
  }

  cancelDelete() {
    this.displayModalDelete = false;
  }

}
