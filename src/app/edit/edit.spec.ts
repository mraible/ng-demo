import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Edit } from './edit';
import { Address, Person, SearchService } from '../shared';
import { MockActivatedRoute } from '../shared/search/mocks/routes';

describe('Edit', () => {
  let mockSearchService: SearchService;
  let mockActivatedRoute: MockActivatedRoute;

  beforeEach(async () => {
    mockActivatedRoute = new MockActivatedRoute({id: 1});

    await TestBed.configureTestingModule({
      imports: [Edit],
      providers: [
        provideRouter([]),
        {provide: ActivatedRoute, useValue: mockActivatedRoute}
      ]
    }).compileComponents();

    mockSearchService = TestBed.inject(SearchService);
  });

  it('should fetch a single record', async () => {
    const fixture = TestBed.createComponent(Edit);

    const person = new Person({id: 1, name: 'Michael Porter Jr.'});
    person.address = new Address({city: 'Denver'});

    // mock response
    vi.spyOn(mockSearchService, 'get').mockReturnValue(of(person));

    // initialize component
    await fixture.whenStable();

    // verify service was called
    expect(mockSearchService.get).toHaveBeenCalledWith(1);

    // verify data was set on component when initialized
    const editComponent = fixture.componentInstance;
    expect(editComponent.person()?.address.city).toBe('Denver');

    // verify HTML renders as expected
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').innerHTML).toBe('Michael Porter Jr.');
  });
});
