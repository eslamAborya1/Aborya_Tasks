import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
 private API = 'https://jsonplaceholder.typicode.com/posts';


  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API);
  }

  getById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API}/${id}`);
  }

  create(post: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.API, post);
  }

  update(id: number, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.API}/${id}`, post);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`);
  }
}

//?? DNS Of Json Placeholder Not Work But The Code Is Work.
