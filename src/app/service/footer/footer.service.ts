import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private apiUrl = 'http://localhost:4002/';

  constructor(private http: HttpClient) {}

  subscribess(email: string, userId: any): Observable<any> {
    return this.http.post(`${this.apiUrl}subscribe`, { email });
  }
  getSocialLinks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
