import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Address, Person, SearchService } from '../shared';
import { Edit } from './edit';

describe('Edit', () => {
  let mockSearchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edit],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1 } } } },
      ],
    }).compileComponents();

    mockSearchService = TestBed.inject(SearchService);
  });

  it('should fetch a single record', async () => {
    const fixture = TestBed.createComponent(Edit);

    const person = new Person({ id: 1, name: 'Michael Porter Jr.' });
    person.address = new Address({ city: 'Denver' });

    // mock response
    vi.spyOn(mockSearchService, 'get').mockReturnValue(of(person));

    // initialize component
    await fixture.whenStable();

    // verify service was called
    expect(mockSearchService.get).toHaveBeenCalledWith(1);

    // verify data was set on component when initialized
    expect(fixture.componentInstance.person()?.address.city).toBe('Denver');

    // verify HTML renders as expected
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.innerHTML).toBe('Michael Porter Jr.');
  });
});
