import { ActivatedRoute, UrlSegment, Params, Data } from '@angular/router';
import { Observable } from "rxjs";

export class MockActivatedRoute extends ActivatedRoute {
  params: any;

  constructor(parameters?:{ [key:string]:any; }) {
    super();
    this.params = parameters;
  }

  getParam(param:string) {
    return this.params[param];
  }
}
