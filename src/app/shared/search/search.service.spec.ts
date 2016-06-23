import { beforeEachProviders, it, describe, expect, inject, fakeAsync, tick } from "@angular/core/testing";
import { MockBackend } from "@angular/http/testing";
import { provide } from "@angular/core";
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions } from "@angular/http";
import { SearchService } from "./search.service";

describe('Search Service', () => {
  beforeEachProviders(() => {
    return [BaseRequestOptions, MockBackend, SearchService,
      provide(Http, {
        useFactory: (backend:ConnectionBackend, defaultOptions:BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
      }),
    ];
  });

  it('should retrieve all search results',
    inject([SearchService, MockBackend], fakeAsync((searchService:SearchService, mockBackend:MockBackend) => {
      var res:Response;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('app/shared/search/data/people.json');
        let response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
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
    inject([SearchService, MockBackend], fakeAsync((searchService:SearchService, mockBackend:MockBackend) => {
      var res;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('app/shared/search/data/people.json');
        let response = new ResponseOptions({body: '[{"name": "John Elway"}, {"name": "Gary Kubiak"}]'});
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
    inject([SearchService, MockBackend], fakeAsync((searchService:SearchService, mockBackend:MockBackend) => {
      var res;
      mockBackend.connections.subscribe(c => {
        expect(c.request.url).toBe('app/shared/search/data/people.json');
        let response = new ResponseOptions({body: '[{"id": 1, "name": "John Elway"}, {"id": 2, "name": "Gary Kubiak"}]'});
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
