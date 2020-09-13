import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { OktaAuthGuard } from '@okta/okta-angular';

const routes: Routes = [
  {path: 'search', component: SearchComponent, canActivate: [OktaAuthGuard]},
  {path: 'edit/:id', component: EditComponent, canActivate: [OktaAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
