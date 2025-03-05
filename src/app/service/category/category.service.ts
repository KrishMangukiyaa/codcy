import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:4002/category/';
  private blogapiUrl = 'http://localhost:4002/blogs/';

  constructor(private http: HttpClient) {}

  
  public getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.blogapiUrl}getBlogsByCategory/${id}`);
    
  }


  getHomeCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getHomeCategories?home=true`);
  }
  

}
