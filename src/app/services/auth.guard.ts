import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('JWT_TOKEN');
  
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
