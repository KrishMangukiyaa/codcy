import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LatestService {
  private apiUrl = 'http://localhost:4002/blogs/latest'; // Adjust API endpoint as needed

  constructor(private http: HttpClient) {}

  public getLatestViewed(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
