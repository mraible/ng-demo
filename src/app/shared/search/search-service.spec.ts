import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchService } from './search-service';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });
    service = TestBed.inject(SearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all search results', () => {
    const mockResponse = [
      {name: 'Nikola Jokić'},
      {name: 'David Adelman'}
    ];

    service.getAll().subscribe((people: any) => {
      expect(people.length).toBe(2);
      expect(people[0].name).toBe('Nikola Jokić');
      expect(people).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should filter by search term', () => {
    const mockResponse = [{name: 'Nikola Jokić'}];

    service.search('nik').subscribe((people: any) => {
      expect(people.length).toBe(1);
      expect(people[0].name).toBe('Nikola Jokić');
    });

    const req = httpMock.expectOne('data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch by id', () => {
    const mockResponse = [
      {id: 1, name: 'Nikola Jokić'},
      {id: 2, name: 'David Adelman'}
    ];

    service.get(2).subscribe((person: any) => {
      expect(person.name).toBe('David Adelman');
    });

    const req = httpMock.expectOne('data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
