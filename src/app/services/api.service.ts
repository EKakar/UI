import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.baseUrl + '/api/';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<any>(`${this.baseUrl}Category`);
  }
  getAllNotes() {
    return this.http.get<any>(`${this.baseUrl}Note`);
  }
  getAllUsers() {
    return this.http.get<any>(`${this.baseUrl}User`);
  }
}
