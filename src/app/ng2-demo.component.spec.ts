import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { Ng2DemoAppComponent } from '../app/ng2-demo.component';

beforeEachProviders(() => [Ng2DemoAppComponent]);

describe('App: Ng2Demo', () => {
  it('should create the app',
      inject([Ng2DemoAppComponent], (app: Ng2DemoAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng2-demo works!\'',
      inject([Ng2DemoAppComponent], (app: Ng2DemoAppComponent) => {
    expect(app.title).toEqual('ng2-demo works!');
  }));
});
