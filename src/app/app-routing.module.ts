import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared';
import { OAuthModule } from 'angular-oauth2-oidc';

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), OAuthModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
