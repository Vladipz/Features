import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const CanActivateAuth: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isAuth;
  if (isLoggedIn) {
    return true;
  }
  return inject(Router).navigate(['/login']);
  // return inject(Router).createUrlTree(['/login']);
};
