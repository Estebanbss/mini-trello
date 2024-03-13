import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, of, throwError } from 'rxjs';
import { Board } from '../interfaces/board';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  boardCreated = new EventEmitter<void>();
  noBoards = new EventEmitter<void>();
  changeRoute = new EventEmitter<void>();
  constructor() { }
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  private userEmail = this.cookies.get('user.email')
  private userName = this.cookies.get('user.name')
  private userType = this.cookies.get('user.type')
  private apiAccount = '/api/Account/getbyemail/' + this.userEmail
  private apiBoard = '/api/Board/'
  private apiList = '/api/List/'
  private apiCard = '/api/Card/'


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

   const boards = await this.getUserId().then((res) => {

    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
  }
    const boards = this.http.get<any>(this.apiBoard + 'getbyAccount/' + res, httpOptions)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            console.log('Theres no Boards :', res);
            return of(null); // Devuelve null si no se encuentran tarjetas
        } else {
            console.log('Error:', error.error.message);
            alert(error.error.message);
            return throwError('e');
        }
        })
      )
        return boards
    })

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

  async deleteBoard(id:number) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
     }
    let lists:any
    let cards:any

    this.getCardsByListId(id).then((res) => {res.subscribe((data) => {cards = data})})
    console.log('Deleted cards')
    this.getListsByBoardId(id).then((res) => {res.subscribe((data) => {lists = data})}).then(() => {
      console.log('Deleted lists')
      this.deleteCardsandLists(cards, lists)
      console.log('Deleted cards and lists')
    })




    let board = this.http.delete<any>(this.apiBoard + 'delete/' + id, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )

        return board
    }

  async updateBoard(id: number, data:Board) {

    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }
    let board = this.http.put<any>(this.apiBoard + 'update/' + id , data, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return board
  }

  async getUserId() {
    // Esperar a que se obtenga el ID del usuario
    return new Promise((resolve, reject) => {
        const id = this.cookies.get('user.id');
        if (id) {
            resolve(id);
        } else {
            this.getUserData().then((res) => {
                res.subscribe((data) => {
                    resolve(data.id);
                });
            });
        }
    });
}

  async updateList(id: number, data:any) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }
    let list = this.http.put<any>(this.apiList + 'update/' + id , data, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return list
  }

  async createList(data:any) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }
    let list = this.http.post<any>(this.apiList + 'create' , data, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return list
  }


  async deleteList(id:number) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }
    let board = this.http.delete<any>(this.apiList + 'deleteList' + id, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return board
  }

  async deleteCard(id:number) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }

    let board = this.http.delete<any>(this.apiCard + 'deleteCard' + id, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return board
  }



  async getCardsByListId(id:number) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }

    let board = this.http.get<any>(this.apiCard + 'getbylist/' + id, httpOptions)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            return of([]); // Devuelve null si no se encuentran tarjetas
        } else {
            console.log('Error:', error.error.message);
            alert(error.error.message);
            return throwError('e');
        }
        })
      )
        return board
  }

  async getListsByBoardId(id:number) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
      }
      let board = this.http.get<any>(this.apiList + 'getbyboardid/' + id, httpOptions)
        .pipe(
          catchError(error => {
            if (error.status === 404) {
              console.log('Not found Lists in Board id:', id);
              return of(null); // Devuelve null si no se encuentran tarjetas
          } else {
              console.log('Error:', error.error.message);
              alert(error.error.message);
              return throwError('e');
          }
          })
        )
          return board
      }

  async deleteCardsandLists(cardsId:any[], listsId:any[]) {
    if(listsId !== null && listsId !== undefined) {
    listsId.forEach(async (id) => {
      await this.deleteList(id)
    }
    )
    }
    if(cardsId !== null && cardsId !== undefined){
      cardsId.forEach(async (id) => {
        await this.deleteCard(id)
      }
      )
    }


  }
}
