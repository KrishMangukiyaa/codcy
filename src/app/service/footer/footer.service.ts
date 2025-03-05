import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private apiUrl = 'http://localhost:4002/subscribe';

  constructor(private http: HttpClient) {}

  subscribess(email: string): Observable<any> {
    return this.http.post(this.apiUrl, { email });
  }
  getSocialLinks(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
