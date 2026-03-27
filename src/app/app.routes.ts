import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing.component').then(
        (m) => m.LandingComponent,
      ),
    title: 'Certum360 | Risk & Compliance',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
