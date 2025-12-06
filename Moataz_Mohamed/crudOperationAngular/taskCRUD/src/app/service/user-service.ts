import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface userData {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<userData[]> {
    return this.http.get<userData[]>(this.apiUrl);
  }

  addUser(user: userData): Observable<userData> {
    return this.http.post<userData>(this.apiUrl, user);
  }

  updateUser(user: userData): Observable<userData> {
    return this.http.put<userData>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
