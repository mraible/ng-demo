import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class SearchService {
  constructor(private http:Http) {
  }

  getAll() {
    return this.http.get('app/shared/search/data/people.json').map((res:Response) => res.json());
  }

  search(q:string) {
    if (!q || q === '*') {
      q = '';
    } else {
      q = q.toLowerCase();
    }
    return this.getAll().map(data => {
      let results = [];
      data.map(item => {
        if (JSON.stringify(item).toLowerCase().includes(q)) {
          results.push(item);
        }
      });
      return results;
    });
  }
}

export class Address {
  street:string;
  city:string;
  state:string;
  zip:string;

  constructor(obj?:any) {
    this.street = obj && obj.street || null;
    this.city = obj && obj.city || null;
    this.state = obj && obj.state || null;
    this.zip = obj && obj.zip || null;
  }
}

export class Person {
  id:number;
  name:string;
  phone:string;
  address:Address;

  constructor(obj?:any) {
    this.id = obj && Number(obj.id) || null;
    this.name = obj && obj.name || null;
    this.phone = obj && obj.phone || null;
    this.address = obj && obj.address || null;
  }
}
