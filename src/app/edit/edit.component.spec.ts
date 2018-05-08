import { MockSearchService } from '../shared/search/mocks/search.service';
import { EditComponent } from './edit.component';
import { TestBed } from '@angular/core/testing';
import { SearchService } from '../shared';
import { MockRouter, MockActivatedRoute } from '../shared/search/mocks/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('EditComponent', () => {
  let mockSearchService: MockSearchService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockSearchService = new MockSearchService();
    mockActivatedRoute = new MockActivatedRoute({'id': 1});
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [EditComponent],
      providers: [
        {provide: SearchService, useValue: mockSearchService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule]
    }).compileComponents();
  });

  it('should fetch a single record', () => {
    const fixture = TestBed.createComponent(EditComponent);

    const person = {name: 'Emmanuel Sanders', address: {city: 'Denver'}};
    mockSearchService.setResponse(person);

    fixture.detectChanges();
    // verify service was called
    expect(mockSearchService.getByIdSpy).toHaveBeenCalledWith(1);

    // verify data was set on component when initialized
    const editComponent = fixture.debugElement.componentInstance;
    expect(editComponent.editAddress.city).toBe('Denver');

    // verify HTML renders as expected
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Emmanuel Sanders');
  });
});
