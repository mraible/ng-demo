import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Person, SearchService } from '../shared';

@Component({
  imports: [FormsModule, RouterLink, NgbHighlight],
  selector: 'app-search',
  templateUrl: './search.html',
})
export class Search implements OnInit, OnDestroy {
  query!: string;
  searchResults = signal<Person[]>([]);
  sub!: Subscription;
  private readonly searchService = inject(SearchService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = params['term'];
        this.search();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  search(): void {
    this.searchService.search(this.query).subscribe({
      next: (data: Person[]) => {
        this.searchResults.set(data);
      },
      error: error => console.log(error)
    });
  }
}
