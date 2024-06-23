import { Component, OnInit, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { EnrolledCardsComponent } from '../parts/enrolled-cards/enrolled-cards.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EnrolledCardsComponent],
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
