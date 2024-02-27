import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  let isAuthenticated = false;

  try {
    isAuthenticated = await authService.isAuth();
  } catch (error) {
    console.error('Error al verificar la autenticación:', error);
  }

  if (isAuthenticated) {
    console.log('Está autenticado');
    router.navigate(['home']);
    return true;
  } else {
    console.log('No está autenticado');
    return true;
  }
};

