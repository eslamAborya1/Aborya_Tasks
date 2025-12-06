import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class Contactservices {
    private apiUrl = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}

  sendContact(contact: any): Observable<any> {
    return this.http.post(this.apiUrl, contact);
  }
}
