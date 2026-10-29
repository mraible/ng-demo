import { Routes } from '@angular/router';
import { Search } from './search/search';

export const routes: Routes = [
  { path: 'search', component: Search },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];
