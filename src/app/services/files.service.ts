import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  private baseUrl = 'https://localhost:7028/api/Files/';

  constructor(private http: HttpClient) {}

  downloadFile(noteId: number) {
    return this.http.get<any>(`${this.baseUrl}DownloadFile/${noteId}`);
  }

  uploadFile(fileObj: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileObj, fileObj.name);

    return this.http.post<any>(`${this.baseUrl}PostFile`, formData);
  }
}
