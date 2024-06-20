import { Component } from '@angular/core';
import { NavigationCancellationCode, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../parts/navigation/navigation.component';
import { FooterComponent } from '../parts/footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
