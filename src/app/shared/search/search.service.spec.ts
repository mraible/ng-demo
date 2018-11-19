import { getTestBed, TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SearchService', () => {
  let injector: TestBed;
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
    });

    injector = getTestBed();
    service = injector.get(SearchService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all search results', () => {
    const dummyData = [
      {name: 'John Elway'},
      {name: 'Gary Kubiak'}
    ];

    service.getAll().subscribe((people: any) => {
      expect(people.length).toBe(2);
      expect(people[0].name).toBe('John Elway');
      expect(people).toEqual(dummyData);
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should filter by search term', () => {
    const dummyData = [
      {name: 'John Elway'}
    ];

    service.search('john').subscribe((people: any) => {
      expect(people.length).toBe(1);
      expect(people[0].name).toBe('John Elway');
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });

  it('should fetch by id', () => {
    const dummyData = [
      {id: 1, name: 'John Elway'},
      {id: 2, name: 'Gary Kubiak'}
    ];

    service.get(2).subscribe((person: any) => {
      expect(person.name).toBe('Gary Kubiak');
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });
});
