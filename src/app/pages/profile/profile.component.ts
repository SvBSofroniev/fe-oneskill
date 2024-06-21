import { Component, OnInit, inject } from '@angular/core';
import { CourseCardsComponent } from '../parts/course-cards/course-cards.component';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CourseCardsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userService = inject(UserServiceService);
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
          console.log(res.firstname);
          
          this.response = res;
        },
        error: ()=> alert('Something went wrong')
      }
    );
  }
 
}
