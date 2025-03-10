import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:4002/ai/';
  constructor(private http: HttpClient) {}

  sendMessage(userId: string, message: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token

    if (!token) {
      console.error('No token found!');
      return new Observable();
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Send token in header
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}chat`, { userId, message }, { headers });
  }


  getChatHistory(): Observable<{ sender: string; text: string }[]> {
    const token = localStorage.getItem('token'); // Assuming token is stored here
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ sender: string; text: string }[]>(`${this.apiUrl}/history`, { headers });
  }
}