import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';

export class MockActivatedRoute extends ActivatedRoute {
  params: Observable<Params>;

  constructor(parameters?: { [key: string]: any; }) {
    super();
    this.params = of(parameters);
  }
}

export class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
