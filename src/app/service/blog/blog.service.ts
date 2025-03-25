import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'http://localhost:4002/blogs/';

  constructor(private http: HttpClient) {}

  getBlogById(blogId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${blogId}`);
  }

  addBlog(blogData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create`, blogData);
  }

  updateBlog(id: string, blogData: FormData) {
    return this.http.put(`${this.apiUrl}updateBlog/${id}`, blogData);
  }
  
  likeBlog(blogId: string, userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${blogId}/like`, { userId });
  }
  
  unlikeBlog(blogId: string, userId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${blogId}/unlike`, { userId });
  }

}
