import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//const baseUrl = 'https://json-placeholder.mock.beeceptor.com/posts';
const baseUrl = 'http://localhost:3000/posts';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  constructor(private http: HttpClient) { }

 
 getAll(): Observable<{id: number | string, title: string, body: string}[]> {
    return this.http.get<{id: number | string, title: string, body: string}[]>(baseUrl);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: number | string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}