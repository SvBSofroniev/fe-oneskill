import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { authGuard } from './services/auth.guard';
import { routeGuardGuard } from './services/route-guard.guard';


export const routes: Routes = [
    {
        path: 'login',
        component: LayoutComponent,
        canActivate: [routeGuardGuard],
        children: [
            {
                path: 'home',
                canActivate: [authGuard],
                component: HomeComponent
            },
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                canActivate: [authGuard],
                component: HomeComponent
            },
            {
                path: 'courses',
                canActivate: [authGuard],
                component: CoursesComponent
            },
            {
                path: 'profile',
                canActivate: [authGuard],
                component: ProfileComponent
            }
        ]
    },
    {
        path: '**',
        component: LoginComponent
    }
];
