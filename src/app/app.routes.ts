import { Routes } from '@angular/router';
import { Edit } from './edit/edit';
import { Search } from './search/search';

export const routes: Routes = [
  { path: 'search', component: Search },
  { path: 'edit/:id', component: Edit },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];
