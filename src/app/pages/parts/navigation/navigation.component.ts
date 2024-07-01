import { AfterContentChecked, AfterViewInit, Component, OnInit, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import env from '../../../../env-constants';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements AfterContentChecked {
  isNotJustUser: boolean = false;
  isDev: boolean = false;

  ngAfterContentChecked(): void {
    let roles = this.authService.getUserRoles();
    this.isNotJustUser = roles.includes(env.ROLE_LECTOR) || roles.includes(env.ROLE_DEV);
    this.isDev = roles.includes(env.ROLE_DEV);
  }



  authService = inject(AuthService);
  router = inject(Router);

  username = sessionStorage.getItem(env.USER)

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
