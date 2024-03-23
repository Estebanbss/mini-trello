import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, last, lastValueFrom, of, throwError } from 'rxjs';
import { Board } from '../interfaces/board';
import { Console } from 'console';
import { Card } from '../interfaces/cards';
import { environment } from '../../environments/environment';

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
  private apiAccount = this.getBaseUrl() + '/Account/getbyemail/' + this.userEmail
  private apiBoard = this.getBaseUrl() + '/Board/'
  private apiList = this.getBaseUrl() + '/List/'
  private apiCard = this.getBaseUrl() + '/Card/'

  getBaseUrl() {
    return environment.production ? 'https://www.trelloclone.somee.com/api' : '/api';
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

  async deleteBoard(id: number) {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    };

    let lists: any;
    let board: any;

    console.log('Deleted cards');

    try {
      // Eliminar listas
      const listsResponse = await lastValueFrom(await this.getListsByBoardId(id));
      lists = await listsResponse;

      if (lists !== null && lists !== undefined) {
        await Promise.all(lists.map(async (list: any) => {
          await this.deleteList(list.id);
        }));
      }

      // Eliminar la tabla
      board = await lastValueFrom(this.http.delete<any>(this.apiBoard + 'delete/' + id, httpOptions));

      if (board !== null && board !== undefined) {
        return board;
      }
    } catch (error) {
      console.error('Error:', error);
      // Manejar el error adecuadamente según tu caso de uso
      throw error;
    }
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




  async updateList(id: number, data: any) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json', // Elimina el espacio adicional
            'Authorization': 'Bearer ' + this.cookies.get('token')
          })
        };

        try {
          const response = await lastValueFrom(this.http.put<any>(this.apiList + 'update/' + id, data, httpOptions))
          return response;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }


  async deleteList(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    };

    try {
      // Obtiene las cards relacionadas a la lista
      const cards: Card[] = await lastValueFrom(await this.getCardsByListId(id));

      // Elimina las tarjetas en paralelo
      await Promise.all(cards.map(async card => {
        if (card.id) {
          await lastValueFrom(await this.deleteCard(card.id));
        }
      }));

      // Elimina la lista
      const response = await lastValueFrom(this.http.delete<any>(this.apiList + 'delete/' + id, httpOptions));
      return response;
    } catch (error) {
      console.error(error);
      alert(error); // Considera usar un mecanismo de notificación más sofisticado
      throw error; // Lanza el error nuevamente para que pueda ser manejado en un nivel superior
    }
}


  async createCard(data:any) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }
    let card = this.http.post<any>(this.apiCard + 'create' , data, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return card
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

  async updateCard(id: number, data:any) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }

    try {
      const response = await lastValueFrom(this.http.put<any>(this.apiCard + 'update/' + id, data, httpOptions))
      return response;
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }


  async deleteCard(id:number) {
    const httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application / json',
        'Authorization': 'Bearer ' + this.cookies.get('token')
      })
    }

    let card = this.http.delete<any>(this.apiCard + 'delete/' + id, httpOptions)
      .pipe(
        catchError(error => {
          console.log(error.error.message);
          alert(error.error.message);
          return throwError('e');
        })
      )
        return card
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
