import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person, SearchService } from '../shared';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  query: string;
  searchResults: Array<Person>;
  sub: Subscription;

  constructor(private searchService: SearchService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = decodeURIComponent(params['term']);
        this.search();
      }
    });
  }

  search(): void {
    this.searchService.search(this.query).subscribe(
      data => { this.searchResults = data; },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
