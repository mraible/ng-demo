import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

export class MockActivatedRoute extends ActivatedRoute {

  constructor(parameters?: { [key: string]: any; }) {
    super();
    // @ts-ignore
    this.params = of(parameters);
  }
}

export class MockRouter {
  navigate = jasmine.createSpy('navigate');
}
