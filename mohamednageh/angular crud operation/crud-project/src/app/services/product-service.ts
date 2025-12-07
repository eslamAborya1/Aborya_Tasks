import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Product} from '../models/product';


@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'https://fakestoreapi.com/products';


  constructor(private http: HttpClient) {}


  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.api);
  }


  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }


  create(p: Product): Observable<Product> {
    return this.http.post<Product>(this.api, p);
  }


  update(id: number, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, p);
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
