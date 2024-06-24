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
export class ProfileComponent implements OnInit{
  displayModal: boolean = false;
  userService = inject(UserServiceService);

  editObj: any={
    "username": "",
    "firstname": "",
    "lastname": "",
    "email":"",
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
        next:res=>{
          this.response = res;
        },
        error: ()=> alert('Something went wrong')
      }
    );
  }

  onEditProfile() {
    console.log(this.editObj);
  }

  openModal() {
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }
 
}
