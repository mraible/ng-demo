import { TestBed } from '@angular/core/testing';
import { SearchService } from './search.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SearchService', () => {
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService]
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
      {name: 'Mike Malone'}
    ];

    service.getAll().subscribe((people: any) => {
      expect(people.length).toBe(2);
      expect(people[0].name).toBe('Nikola Jokić');
      expect(people).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should filter by search term', () => {
    const mockResponse = [{name: 'Nikola Jokić'}];

    service.search('nik').subscribe((people: any) => {
      expect(people.length).toBe(1);
      expect(people[0].name).toBe('Nikola Jokić');
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch by id', () => {
    const mockResponse = [
      {id: 1, name: 'Nikola Jokić'},
      {id: 2, name: 'Mike Malone'}
    ];

    service.get(2).subscribe((person: any) => {
      expect(person.name).toBe('Mike Malone');
    });

    const req = httpMock.expectOne('assets/data/people.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
