import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Login } from '../interfaces/user';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router
  ) {}

  private apiLogin = this.getBaseUrl() + '/login/authenticate';

  login(data: Login) {


    return this.http.post<string>(this.apiLogin, data).pipe(
      catchError(error => {
        console.error(error.error.message);
        alert(error.error.message);
        return throwError('e');
      })
    );
  }

  register(data: any) {
    return this.http.post(this.getBaseUrl() + '/account/create', data).pipe(
      catchError(error => {
        console.error(error.error.message);
        alert(error.error.message);
        return throwError('e');
      })
    );
  }

  getBaseUrl() {
    return environment.production ? 'https://www.trelloclone.somee.com/api' : '/api';
  }

  async logout() {
    this.cookies.delete('token');
    this.cookies.delete('user.email');
    this.cookies.delete('user.name');
    this.cookies.delete('user.type');
    this.cookies.deleteAll();
    localStorage.clear();
    localStorage.removeItem('user')
    //luego
    window.location.reload();
  }


  async getToken(): Promise<string | null> {
    const token = await this.cookies.get('token');
    return token;
  }

  async isAuth(): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (!token) return false;
      const isExpired = await this.isTokenExpired(token);
      return !isExpired?.expired;
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  }

  private async isTokenExpired(token: string): Promise<{ expired: boolean, timeRemaining: number }> {
    const arrayToken = token.split('.');
    return new Promise((resolve, reject) => {
      try {
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        this.cookies.set('user.email', tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress']);
        this.cookies.set('user.name', tokenPayload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
        this.cookies.set('user.type', tokenPayload['AType']);
        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const timeUntilExpiration = tokenPayload?.exp - currentTimeInSeconds;
        resolve({
          expired: currentTimeInSeconds >= tokenPayload?.exp,
          timeRemaining: timeUntilExpiration
        });
      } catch (error) {
        console.error('Error parsing token payload:', error);
        reject(error);
      }
    });
  }
}
