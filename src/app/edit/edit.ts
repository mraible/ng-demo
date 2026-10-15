import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Person, SearchService } from '../shared';

@Component({
  imports: [FormsModule],
  selector: 'app-edit',
  templateUrl: './edit.html',
})
export class Edit implements OnInit, OnDestroy {
  person = signal<Person | undefined>(undefined);
  sub!: Subscription;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SearchService);

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      this.service.get(id).subscribe(person => {
        if (person) {
          this.person.set(person);
        } else {
          this.gotoList();
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  async cancel() {
    await this.router.navigate(['/search']);
  }

  async save() {
    this.service.save(this.person()!);
    await this.gotoList();
  }

  async gotoList() {
    const person = this.person();
    if (person) {
      await this.router.navigate(['/search', {term: person.name}]);
    } else {
      await this.router.navigate(['/search']);
    }
  }
}
