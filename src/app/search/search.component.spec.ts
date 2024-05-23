import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { SearchService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { MockActivatedRoute } from '../shared/search/mocks/routes';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService: SearchService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new MockActivatedRoute({term: 'nikola'});

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // mock response
    mockSearchService = TestBed.inject(SearchService);
    mockSearchService.search = jasmine.createSpy().and.returnValue(of([]));

    // initialize component
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when a term is set and search() is called', () => {
    component = fixture.componentInstance;
    component.query = 'J';
    component.search();
    expect(mockSearchService.search).toHaveBeenCalledWith('J');
  });

  it('should search automatically when a term is on the URL', () => {
    fixture.detectChanges();
    expect(mockSearchService.search).toHaveBeenCalledWith('nikola');
  });
});
