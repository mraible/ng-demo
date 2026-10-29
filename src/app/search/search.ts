import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Person, SearchService } from '../shared';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search implements OnInit {
  private readonly searchService = inject(SearchService);
  private readonly route = inject(ActivatedRoute);

  query = '';
  protected readonly searchResults = signal<Person[]>([]);

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params['term']) {
      this.query = decodeURIComponent(params['term']);
      this.search();
    }
  }

  search(): void {
    this.searchService.search(this.query).subscribe({
      next: (data: Person[]) => this.searchResults.set(data),
      error: error => console.log(error),
    });
  }
}
