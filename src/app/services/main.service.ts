import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { Board } from '../interfaces/board';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor() { }
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private userEmail = this.cookies.get('user.email')
  private userName = this.cookies.get('user.name')
  private userType = this.cookies.get('user.type')
  private userId = this.cookies.get('user.id')
  private apiAccount = '/api/Account/getbyemail/' + this.userEmail
  private apiBoard = '/api/Board/'


  async getUserData() {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }

    const user = this.http.get<any>(this.apiAccount, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return user
  }

  async getBoards(){
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
  }
    const boards = this.http.get<any>(this.apiBoard + 'getbyAccount/' + this.userId, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return boards

  }

  async createBoard(data:Board) {

    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }
    let board = this.http.post<any>(this.apiBoard + 'create' , data, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return board
  }
}
