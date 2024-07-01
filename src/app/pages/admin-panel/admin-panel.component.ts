import { Component, OnInit, inject } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { CommonModule } from '@angular/common';
import env from '../../../env-constants'
import { FormsModule } from '@angular/forms';

type User = {
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  password: "",
  roles: [],
  createdAt: "",
  updatedAt: ""
}

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  isDisabled = false;
  searchValue = {
    username: ''
  }

  userService = inject(UserServiceService);

  usersArray: User[] = [];
  filteredUsers: User[] =[];

  ngOnInit(): void {
    this.userService.getUsersInfo().subscribe(
      {
        next: res => {
          this.filteredUsers = res;
          this.usersArray = res.map((x: User) => ({
            ...x,
            roles: x.roles.join(', ').toUpperCase()
          }));
        },
        error: () => alert('Something went wrong')
      }
    );
  }

  updateUserRoleAdmin(username: string) {
    this.updateRole(username, env.ROLE_ADMIN);
  }

  updateUserRoleDev(username: string) {
    this.updateRole(username, env.ROLE_DEV);
  }

  updateUserRoleLector(username: string) {
    this.updateRole(username, env.ROLE_LECTOR);
  }

  updateRole(username: string, role: string) {
    this.userService.updateUserRole(username, role).subscribe({
      next: () => {
        this.userService.getUsersInfo().subscribe(
          {
            next: res => {
              this.filteredUsers = res;
              this.usersArray = res.map((x: User) => ({
                ...x,
                roles: x.roles.join(', ').toUpperCase()
              }));
              this.isDisabled = true;
            },
            error: () => alert('Something went wrong')
          }
        );
      }
    });

  }

  isDev(roles: string[]) {
    return roles.includes(env.ROLE_DEV.toUpperCase());
  }

  isAdmin(roles: string[]) {
    return roles.includes(env.ROLE_ADMIN.toUpperCase());
  }

  isLecturer(roles: string[]) {
    return roles.includes(env.ROLE_LECTOR.toUpperCase());
  }

  searchByUsername() {
    if (this.searchValue.username !== '') {
      this.filteredUsers = this.usersArray.filter(x => x.username.toLowerCase().includes(this.searchValue.username.toLowerCase()))
    } else {
      this.filteredUsers = this.usersArray;
    }
  }
}
