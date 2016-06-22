import { provide } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders,
} from '@angular/core/testing';

import { RouteSegment } from '@angular/router';
import { ROUTER_FAKE_PROVIDERS } from '@angular/router/testing';
import { MockRouteSegment } from '../shared/search/mocks/routes';
import { MockSearchService } from '../shared/search/mocks/search.service';

import { EditComponent } from './edit.component';

describe('Edit component', () => {
  var mockSearchService:MockSearchService;

  beforeEachProviders(() => {
    mockSearchService = new MockSearchService();

    return [
      mockSearchService.getProviders(),
      ROUTER_FAKE_PROVIDERS,
      provide(RouteSegment, { useValue: new MockRouteSegment({ 'id': '1' }) })
    ];
  });

  it('should fetch a single record', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(EditComponent).then((fixture) => {
      let person = {name: 'Emmanuel Sanders', address: {city: 'Denver'}};
      mockSearchService.setResponse(person);

      fixture.detectChanges();
      // verify service was called
      expect(mockSearchService.getByIdSpy).toHaveBeenCalledWith(1);

      // verify data was set on component when initialized
      let editComponent = fixture.debugElement.componentInstance;
      expect(editComponent.editAddress.city).toBe('Denver');

      // verify HTML renders as expected
      var compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h3')).toHaveText('Emmanuel Sanders');
    });
  }));
});
