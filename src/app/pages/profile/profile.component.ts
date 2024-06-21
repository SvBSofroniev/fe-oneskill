import { Component } from '@angular/core';
import { CoursesComponent } from '../courses/courses.component';
import { CourseCardsComponent } from '../parts/course-cards/course-cards.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CourseCardsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
