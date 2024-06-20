import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const routeGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('JWT_TOKEN');
  
  if (token) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
