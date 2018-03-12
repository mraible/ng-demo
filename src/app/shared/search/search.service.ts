import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get('assets/data/people.json');
  }

  search(q: string): Observable<any> {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().map((data: any) => {
      const results: any = [];
      data.map(item => {
        // check for item in localStorage
        if (localStorage['person' + item.id]) {
          item = JSON.parse(localStorage['person' + item.id]);
        }
        if (JSON.stringify(item).toLowerCase().includes(q)) {
          results.push(item);
        }
      });
      return results;
    });
  }

  get(id: number) {
    return this.getAll().map((all: any) => {
      if (localStorage['person' + id]) {
        return JSON.parse(localStorage['person' + id]);
      }
      return all.find(e => e.id === id);
    });
  }

  save(person: Person) {
    localStorage['person' + person.id] = JSON.stringify(person);
  }
}

export class Address {
  street: string;
  city: string;
  state: string;
  zip: string;

  constructor(obj?: any) {
    this.street = obj && obj.street || null;
    this.city = obj && obj.city || null;
    this.state = obj && obj.state || null;
    this.zip = obj && obj.zip || null;
  }
}

export class Person {
  id: number;
  name: string;
  phone: string;
  address: Address;

  constructor(obj?: any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || null;
    this.phone = obj && obj.phone || null;
    this.address = obj && obj.address || null;
  }
}
