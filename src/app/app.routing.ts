import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from "./search/index";
import { EditComponent } from "./edit/index";
import { AppComponent } from "./app.component";

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'edit/:id', component: EditComponent }
];

export const appRoutingProviders: any[] = [];

export const routing = RouterModule.forRoot(appRoutes);
