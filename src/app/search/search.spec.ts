import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Search } from './search';
import { SearchService } from '../shared';
import { MockActivatedRoute } from '../shared/search/mocks/routes';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let mockSearchService: SearchService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new MockActivatedRoute({term: 'nikola'});

    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
        provideRouter([]),
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    }).compileComponents();

    // mock response
    mockSearchService = TestBed.inject(SearchService);
    mockSearchService.search = vi.fn().mockReturnValue(of([]));

    // initialize component
    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when a term is set and search() is called', () => {
    component.query = 'J';
    component.search();
    expect(mockSearchService.search).toHaveBeenCalledWith('J');
  });

  it('should search automatically when a term is on the URL', () => {
    expect(mockSearchService.search).toHaveBeenCalledWith('nikola');
  });
});
