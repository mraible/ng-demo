/* tslint:disable:no-unused-variable */
import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { SearchService } from './search.service';
import { BaseRequestOptions, Http, ConnectionBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        {provide: MockBackend, useClass: MockBackend},
        {provide: BaseRequestOptions, useClass: BaseRequestOptions}
      ]
    });
  });

  it('should retrieve all search results',
    inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
      let res: Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('assets/data/people.json');
        const response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
        c.mockRespond(new Response(response));
      });
      searchService.getAll().subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].name).toBe('John Elway');
    }))
  );

  it('should filter by search term',
    inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
      let res;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('assets/data/people.json');
        const response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
        c.mockRespond(new Response(response));
      });
      searchService.search('john').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].name).toBe('John Elway');
    }))
  );

  it('should fetch by id',
    inject([SearchService, MockBackend], fakeAsync((searchService: SearchService, mockBackend: MockBackend) => {
      let res;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('assets/data/people.json');
        const response = new ResponseOptions({body: '[{"id": 1, "name": "John Elway"}, {"id": 2, "name": "Gary Kubiak"}]'});
        c.mockRespond(new Response(response));
      });
      searchService.search('2').subscribe((response) => {
        res = response;
      });
      tick();
      expect(res[0].name).toBe('Gary Kubiak');
    }))
  );
});
