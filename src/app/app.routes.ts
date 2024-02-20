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
    path: 'auth',
    title: 'Auth',
    loadComponent: () => import('./views/auth/auth.component')
  },
  {

    path: '',
    redirectTo: '',
    pathMatch: 'full'

  }
];
