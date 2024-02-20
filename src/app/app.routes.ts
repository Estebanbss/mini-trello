import { Routes } from '@angular/router';

export const routes: Routes = [
  {

    path: '',
    loadComponent: () => import('./views/main/main.component'),

    children:[

      {
        path:'board/:id',
        title: 'Boards',
        loadComponent: () => import('./views/main/board/board.component')
      },

      {
        path:'card/:id',
        title: 'Cards',
        loadComponent: () => import('./views/main/card/card.component')

      }

    ]

  },

  {
    path: 'login',
    title: 'Log In - MiniTrello',
    loadComponent: () => import('./views/auth/auth.component')
  },
  {
    path: 'signup',
    title: 'Sign Up - MiniTrello',
    loadComponent: () => import('./views/register/register.component')
  },

  {

    path: '',
    redirectTo: '',
    pathMatch: 'full'

  }
];
