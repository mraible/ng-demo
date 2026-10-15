import { Routes } from '@angular/router';
import { authGuardFn } from '@auth0/auth0-angular';
import { Home } from './home/home';
import { Search } from './search/search';
import { Edit } from './edit/edit';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'search', component: Search, canActivate: [authGuardFn] },
  { path: 'edit/:id', component: Edit, canActivate: [authGuardFn] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
