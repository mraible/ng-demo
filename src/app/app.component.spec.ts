/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestBed } from '@angular/core/testing/test_bed';

describe('App: Ng2Demo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppComponent]
    });
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have as title \'app works!\'',
    inject([AppComponent], (app: AppComponent) => {
      expect(app.title).toEqual('app works!');
    }));
});
