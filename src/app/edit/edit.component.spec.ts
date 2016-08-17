/* tslint:disable:no-unused-variable */

import { provide } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';

import { MockActivatedRoute } from '../shared/search/mocks/routes';
import { MockSearchService } from '../shared/search/mocks/search.service';

import { EditComponent } from './edit.component';
import { ActivatedRoute } from "@angular/router";
import { inject } from "@angular/core/testing/test_bed";

describe('Component: Edit', () => {
  var mockSearchService:MockSearchService;

  beforeEach(() => {
    mockSearchService = new MockSearchService();

    return [
      mockSearchService.getProviders(),
      provide(ActivatedRoute, { useValue: new MockActivatedRoute({ 'id': '1' }) })
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
      expect(compiled.querySelector('h3')).toBe('Emmanuel Sanders');
    });
  }));
});
