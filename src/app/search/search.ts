import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Person, SearchService } from '../shared';

@Component({
  imports: [FormsModule],
  selector: 'app-search',
  styleUrl: './search.css',
  templateUrl: './search.html',
})
export class Search {
  private readonly searchService = inject(SearchService);

  protected query = '';
  protected readonly searchResults = signal<Person[]>([]);

  search(): void {
    this.searchService.search(this.query).subscribe({
      next: (data: Person[]) => this.searchResults.set(data),
      error: error => console.log(error),
    });
  }
}
