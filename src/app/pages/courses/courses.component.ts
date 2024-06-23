import { Component } from '@angular/core';
import { SearchBarComponent } from '../parts/search-bar/search-bar.component';
import { CourseCardsComponent } from '../parts/course-cards/course-cards.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [SearchBarComponent, CourseCardsComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  messageToPass: string= '';

  receiveMessage(message: string) {
    console.log(message);
    
    this.messageToPass = message;
  }
}
