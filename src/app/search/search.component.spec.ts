import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { MockActivatedRoute } from '../shared/search/mocks/routes';
import { SearchService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { of } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockSearchService: SearchService;

  beforeEach(async(() => {
    mockActivatedRoute = new MockActivatedRoute({term: 'nikola'});

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ],
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule,
        MatListModule, MatIconModule, MatInputModule, NoopAnimationsModule]
    })
      .compileComponents();
  }));

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
    component = fixture.debugElement.componentInstance;
    component.query = 'J';
    component.search();
    expect(mockSearchService.search).toHaveBeenCalledWith('J');
  });

  it('should search automatically when a term is on the URL', () => {
    fixture.detectChanges();
    expect(mockSearchService.search).toHaveBeenCalledWith('nikola');
  });
});
