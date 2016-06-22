import { Component } from '@angular/core';
import { SearchComponent } from './+search';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import 'rxjs/add/operator/map';
import { SearchService } from './shared/index';
import { HTTP_PROVIDERS } from '@angular/http';
import { EditComponent } from './+edit';

@Component({
  moduleId: module.id,
  selector: 'ng2-demo-app',
  templateUrl: 'ng2-demo.component.html',
  styleUrls: ['ng2-demo.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS],
  viewProviders: [SearchService]
})
@Routes([
  {path: '/search', component: SearchComponent},
  {path: '/edit/:id', component: EditComponent}
])
export class Ng2DemoAppComponent {
  title = 'ng2-demo works!';
}
