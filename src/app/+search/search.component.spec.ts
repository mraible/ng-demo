import {provide} from '@angular/core';
import {TestComponentBuilder} from '@angular/compiler/testing';
import {
  it,
  describe,
  expect,
  inject,
  beforeEachProviders,
} from '@angular/core/testing';

import {RouteSegment} from '@angular/router';
import {MockRouteSegment} from '../shared/search/mocks/routes';
import {MockSearchService} from '../shared/search/mocks/search.service';

import {SearchComponent} from './search.component';

describe('Search component', () => {
  var mockSearchService:MockSearchService;

  beforeEachProviders(() => {
    mockSearchService = new MockSearchService();

    return [
      mockSearchService.getProviders(),
      provide(RouteSegment, {useValue: new MockRouteSegment({'term': 'peyton'})})
    ];
  });

  it('should search when a term is set and search() is called', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(SearchComponent).then((fixture) => {
      let searchComponent = fixture.debugElement.componentInstance;
      searchComponent.query = 'M';
      searchComponent.search();
      expect(mockSearchService.searchSpy).toHaveBeenCalledWith('M');
    });
  }));

  it('should search automatically when a term is on the URL', inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    return tcb.createAsync(SearchComponent).then((fixture) => {
      fixture.detectChanges();
      expect(mockSearchService.searchSpy).toHaveBeenCalledWith('peyton');
    });
  }));
});
