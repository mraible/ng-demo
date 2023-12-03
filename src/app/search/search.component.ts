import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Person, SearchService } from '../shared';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [FormsModule, JsonPipe, RouterLink, MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule],
  selector: 'app-search',
  standalone: true,
  styleUrl: './search.component.css',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  query!: string;
  searchResults: Person[] = [];
  sub!: Subscription;

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
  }

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
