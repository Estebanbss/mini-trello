import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Login} from '../interfaces/user';
import { catchError, throwError, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  constructor() { }
  apiLogin = 'https://trelloclown.azurewebsites.net/api/login/authenticate'

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
}
