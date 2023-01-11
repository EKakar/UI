import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private baseUrl = 'https://localhost:7028/api/Note/';

  constructor(private http: HttpClient) {}

  getAllNotes() {
    return this.http.get<any>(this.baseUrl);
  }

  getUserNotes(mail: any) {
    return this.http.get<any>(`${this.baseUrl}userNotes${mail}`);
  }

  addNote(noteObj: any) {
    return this.http.post<any>(`${this.baseUrl}addNote`, noteObj);
  }

  deleteNote(noteId: number) {
    return this.http.delete<any>(`${this.baseUrl}${noteId}`);
  }
}
