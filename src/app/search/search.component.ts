import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Person, SearchService } from '../shared';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, JsonPipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit, OnDestroy {
  query!: string;
  searchResults: Person[] = [];
  sub!: Subscription;

  constructor(private searchService: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = decodeURIComponent(params['term']);
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
        this.searchResults = data;
      },
      error: error => console.log(error)
    });
  }

}
