import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Service()
export class SearchService {
  private readonly http = inject(HttpClient);

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>('data/people.json');
  }

  search(q: string): Observable<Person[]> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().pipe(
      map((data: Person[]) =>
        data
          .map((item: Person) =>
            localStorage['person' + item.id] ? JSON.parse(localStorage['person' + item.id]) : item,
          )
          .filter((item: Person) => JSON.stringify(item).toLowerCase().includes(q)),
      ),
    );
  }

  get(id: number): Observable<Person | undefined> {
    return this.getAll().pipe(
      map((all: Person[]) => {
        if (localStorage['person' + id]) {
          return JSON.parse(localStorage['person' + id]);
        }
        return all.find((e: Person) => e.id === id);
      }),
    );
  }

  save(person: Person): void {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(address: Partial<Address> = {}) {
    this.street = address?.street || '';
    this.city = address?.city || '';
    this.state = address?.state || '';
    this.zip = address?.zip || '';
  }
}

export class Person {
  id: number | null;
  name: string;
  phone: string;
  address: Address;

  constructor(person: Partial<Person> = {}) {
    this.id = person?.id || null;
    this.name = person?.name || '';
    this.phone = person?.phone || '';
    this.address = person?.address || new Address();
  }
}
