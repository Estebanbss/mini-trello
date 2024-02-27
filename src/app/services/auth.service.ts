import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login} from '../interfaces/user';
import { catchError, throwError, zip } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  constructor() { }
  private apiLogin = '/api/login/authenticate'

  login(data: Login) {
   let token = this.http.post<string>(this.apiLogin, data)
    .pipe(
      catchError(error => {
        console.log(error.error.message);
        alert(error.error.message)
        return throwError('e')
      })
    )
    return token;
  }

  async getToken(): Promise<string | null> {
     const token = await this.cookies.get('token');
     return token;
   }




  async isAuth(): Promise<boolean> {
    try {
      const token = await this.getToken();
      if (!token) return false; // Manejar caso cuando token es null o undefined

      const isExpired = await this.isTokenExpired(token);
      return !isExpired?.expired; // Usar optional chaining para acceder a isExpired.expired de forma segura
    } catch (error) {
      this.handleAuthenticationError(error);
      return false;
    }
  }

  private handleAuthenticationError(error: any): void {
    console.error('Error al verificar la autenticación:', error);
  }



  async isTokenExpired(token: string): Promise<{ expired: boolean, timeRemaining: number }> {
    console.log("Token:", token);
    const arrayToken = token.split('.');

    return new Promise((resolve, reject) => {
      try {
        const tokenPayload = JSON.parse(atob(arrayToken[1]));
        console.log(tokenPayload);

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
        const timeUntilExpiration = tokenPayload?.exp - currentTimeInSeconds;

        console.log("Time until expiration:", timeUntilExpiration, "seconds");
        console.log("Is token expired?", currentTimeInSeconds >= tokenPayload?.exp);

        resolve({
          expired: currentTimeInSeconds >= tokenPayload?.exp,
          timeRemaining: timeUntilExpiration
        });
      } catch (error) {
        console.error("Error parsing token payload:", error);
        reject(error);
      }
    });
  }


}
