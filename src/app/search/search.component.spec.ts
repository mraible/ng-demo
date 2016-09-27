/* tslint:disable:no-unused-variable */

import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MockActivatedRoute, MockRouter } from '../shared/search/mocks/routes';
import { MockSearchService } from '../shared/search/mocks/search.service';
import { SearchComponent } from './search.component';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../shared/search/search.service';

describe('Component: Search', () => {
  let mockSearchService: MockSearchService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockSearchService = new MockSearchService();
    mockActivatedRoute = new MockActivatedRoute({'term': 'peyton'});
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {provide: SearchService, useValue: mockSearchService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule]
    });
  });

  it('should search when a term is set and search() is called', () => {
    let fixture = TestBed.createComponent(SearchComponent);
    let searchComponent = fixture.debugElement.componentInstance;
    searchComponent.query = 'M';
    searchComponent.search();
    expect(mockSearchService.searchSpy).toHaveBeenCalledWith('M');
  });

  it('should search automatically when a term is on the URL', () => {
    let fixture = TestBed.createComponent(SearchComponent);
    fixture.detectChanges();
    expect(mockSearchService.searchSpy).toHaveBeenCalledWith('peyton');
  });
});
