/* tslint:disable:no-unused-variable */

import { provide } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MockActivatedRoute } from "../shared/search/mocks/routes";
import { MockSearchService } from "../shared/search/mocks/search.service";
import { SearchComponent } from "./search.component";
import { TestComponentBuilder } from "@angular/core/testing/test_component_builder";
import { inject } from "@angular/core/testing/test_bed";

describe('Component: Search', () => {
  var mockSearchService: MockSearchService;

  beforeEach(() => {
    mockSearchService = new MockSearchService();

    return [
      mockSearchService.getProviders(),
      provide(ActivatedRoute, {useValue: new MockActivatedRoute({'term': 'peyton'})})
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

