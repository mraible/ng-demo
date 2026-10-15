import { Routes } from '@angular/router';
import { Search } from './search/search';
import { Edit } from './edit/edit';

export const routes: Routes = [
  { path: 'search', component: Search },
  { path: 'edit/:id', component: Edit },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];
