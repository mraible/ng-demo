import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person, SearchService } from '../shared';

@Component({
  imports: [FormsModule],
  selector: 'app-edit',
  styleUrl: './edit.css',
  templateUrl: './edit.html',
})
export class Edit implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(SearchService);

  protected readonly person = signal<Person | undefined>(undefined);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.service.get(id).subscribe(person => {
      if (person) {
        this.person.set(person);
      } else {
        void this.gotoList();
      }
    });
  }

  async cancel(): Promise<void> {
    await this.router.navigate(['/search']);
  }

  async save(): Promise<void> {
    const person = this.person();
    if (person) {
      this.service.save(person);
    }
    await this.gotoList();
  }

  async gotoList(): Promise<void> {
    const person = this.person();
    if (person) {
      await this.router.navigate(['/search', { term: person.name }]);
    } else {
      await this.router.navigate(['/search']);
    }
  }
}
