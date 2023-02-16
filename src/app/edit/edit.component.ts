import { Component, OnDestroy, OnInit } from '@angular/core';
import { Person, SearchService } from '../shared';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  person!: Person;
  sub!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: SearchService) {
  }

  async ngOnInit(): Promise<void> {
    this.sub = this.route.params.subscribe(params => {
      const id = + params['id']; // (+) converts string 'id' to a number
      this.service.get(id).subscribe(person => {
        if (person) {
          this.person = person;
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
    this.service.save(this.person);
    await this.gotoList();
  }

  async gotoList() {
    if (this.person) {
      await this.router.navigate(['/search', {term: this.person.name}]);
    } else {
      await this.router.navigate(['/search']);
    }
  }
}
