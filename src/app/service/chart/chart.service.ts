import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  private apiUrl = 'http://localhost:4002/blogs';

  constructor(private http: HttpClient) {}

  getAllChartData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chartData`);
  }

  getBlogChartDataById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/blogData/${id}`);
  }

  getChartCategoryData(): Observable<{ labels: string[], values: number[], likes: number[],colors: string[] }> {
    return this.http.get<any[]>(`${this.apiUrl}/getChartCategoryData`).pipe(
      map((data) => ({
        labels: data.map(item => item.categoryName),
        values: data.map(item => item.totalViews),
        likes: data.map(item => item.totalLikes),
        colors: data.map(item => item.categoryColor) 
      }))
    );
  }

}

// create an expencc management web app which was contain dark mode also and which support mongodb database. its ui was very morden and very good user friendly. it,s home page containe expence live chart. which have ai chat bot which was suggest an idias for save your money using your expence data.
