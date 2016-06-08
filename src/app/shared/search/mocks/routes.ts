import {RouteSegment} from '@angular/router';

export class MockRouteSegment implements RouteSegment {
  urlSegments:any;
  parameters:any;
  outlet:string;
  _type:any;
  _componentFactory:any;
  type:any;
  stringifiedUrlSegments:string;

  constructor(parameters?:{ [key:string]:any; }) {
    this.parameters = parameters;
  }

  getParam(param:string) {
    return this.parameters[param];
  }
}
