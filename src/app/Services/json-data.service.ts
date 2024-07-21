import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  private apiUrl = 'http://localhost:5260/Json';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDataList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/list`);
  }

  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
