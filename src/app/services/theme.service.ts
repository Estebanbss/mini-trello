import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {}

  getTheme(){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }else if(typeof localStorage !== 'undefined' ){
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
      return 'dark';
    }else{
      return 'dark'
    }

  }

  veryfyTheme(){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
     }
    }

  toggleTheme() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('dark');
      } else {
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('dark');
      }
    }

  }


}
