import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  web: string;
  company_name: string;
  city: string;
  state: string;
  zip: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private apiUrl =
    'https://d2k-static-assets.s3.ap-south-1.amazonaws.com/assignment-files/python-backend-assignment/users.json';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User | undefined> {
    return new Observable(observer => {
      this.getUsers().subscribe((users: User[]) => {
        const user = users.find(u => u.id === id);
        observer.next(user);
        observer.complete();
      });
    });
  }
}