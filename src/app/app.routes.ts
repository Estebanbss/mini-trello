import { Routes } from '@angular/router';
import { homeGuard } from './guards/home.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {

    path: '',
    canActivate: [homeGuard],
    loadComponent: () => import('./views/main/main.component'),

    children:[

      {
        path:'board/:id/:boardName',
        canActivate: [homeGuard],
        title: 'Boards',
        loadComponent: () => import('./views/main/board/board.component')
      },

      {
        path:'card/:id',
        canActivate: [homeGuard],
        title: 'Cards',
        loadComponent: () => import('./views/main/card/card.component')

      }

    ]

  },

  {
    path: 'login',
    canActivate: [authGuard],
    title: 'Log In - MiniTrello',
    loadComponent: () => import('./views/auth/auth.component')
  },
  {
    path: 'signup',
    canActivate: [authGuard],
    title: 'Sign Up - MiniTrello',
    loadComponent: () => import('./views/register/register.component')
  },

  {

    path: '',
    redirectTo: '/',
    pathMatch: 'full'

  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];
