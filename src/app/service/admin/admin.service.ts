import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:4002/';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}category/getAll`);
  }

  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}category/${id}`);
  }

  createCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}category/create`, category);
  }

  updateCategory(id: string, category: any): Observable<any> {
    return this.http.put(`${this.apiUrl}category/updateCategory/${id}`, category);
  }

  deleteCategory(id : string) {
    return this.http.delete(`${this.apiUrl}category/deleteCategory/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}user/getAllUser`);
  }
  
  getAllBlogs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}blogs/getAll`);
  }

  deleteBlog(blogId: string) {
    return this.http.delete(`${this.apiUrl}blogs/deleteBlog/${blogId}`);
  }

  toggleShowOnHome(categoryId: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}category/toggle-show-on-home/${categoryId}`, {});
  }
  
}
