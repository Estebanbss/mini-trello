import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const homeGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const cookies = inject(CookieService);

  let isAuthenticated = await authService.isAuth().catch(error => {
     console.error('Error al verificar la autenticación:', error);
     return false; // Manejar el error de forma adecuada, por ejemplo, redirigir a una página de error.
 });

 if (isAuthenticated != null && isAuthenticated != undefined) {
     if (isAuthenticated) {
         return true;
     } else {
         router.navigate(['login']);
         cookies.delete('token');
         cookies.delete('user.email');
         cookies.delete('user.name');
         cookies.delete('user.id');
         cookies.delete('user.type');
         localStorage.removeItem('user');
         return false;
     }
 } else {
     return false;
 }
};

