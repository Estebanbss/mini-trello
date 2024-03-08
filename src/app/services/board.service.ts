import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private http = inject(HttpClient);
  private cookies = inject(CookieService);
  apiList = '/api/List/';
  apiCard = '/api/Card/';
  constructor() { }



}
