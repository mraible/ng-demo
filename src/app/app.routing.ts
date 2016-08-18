import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/index';
import { EditComponent } from './edit/index';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
