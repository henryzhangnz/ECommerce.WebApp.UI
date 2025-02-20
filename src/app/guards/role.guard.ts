import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../interfaces/auth/role';
import { AuthService } from '../services/auth/auth.service';
import { filter, map, take } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    filter((user) => user !== null),
    take(1),
    map((user) => {
      return user?.role === Role.Admin
        ? true
        : router.createUrlTree(['/login']);
    })
  );
};
