import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Search } from './search/search';
import { Edit } from './edit/edit';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'search', component: Search },
  { path: 'edit/:id', component: Edit },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
