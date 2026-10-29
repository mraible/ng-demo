import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { Edit } from './edit/edit';
import { Home } from './home/home';
import { Search } from './search/search';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: Home,
  },
  { path: 'search', component: Search, canActivate: [authGuardFn] },
  { path: 'edit/:id', component: Edit, canActivate: [authGuardFn] },
];
