import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { MockSearchService } from '../shared/search/mocks/search.service';
import { MockActivatedRoute, MockRouter } from '../shared/search/mocks/routes';
import { SearchService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockSearchService: MockSearchService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async(() => {
    mockSearchService = new MockSearchService();
    mockActivatedRoute = new MockActivatedRoute({'term': 'peyton'});

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        {provide: SearchService, useValue: mockSearchService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ],
      imports: [FormsModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search when a term is set and search() is called', () => {
    component = fixture.debugElement.componentInstance;
    component.query = 'M';
    component.search();
    expect(mockSearchService.searchSpy).toHaveBeenCalledWith('M');
  });

  it('should search automatically when a term is on the URL', () => {
    fixture.detectChanges();
    expect(mockSearchService.searchSpy).toHaveBeenCalledWith('peyton');
  });
});
