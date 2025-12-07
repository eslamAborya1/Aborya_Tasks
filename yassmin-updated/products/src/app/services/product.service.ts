import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../model/iproduct';

@Injectable({ providedIn: 'root' })
export class ProductService {
private api = 'https://fakestoreapi.com/products';


constructor(private http: HttpClient) {}


getAll(): Observable<Iproduct[]> {
return this.http.get<Iproduct[]>(this.api);
}
}