import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4002/user';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  private selectedUserSource = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSource.asObservable();

  private getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private setTokenInCookies(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      Cookies.set('jwtToken', token, { expires: 7, secure: true });
    }
  }

  private setHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  public checkAndSetToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.setTokenInCookies(token); // Set token in cookies
      } else {
        this.router.navigate(['/login']); // Redirect to login if no token
      }
    }
  }

  public async register(value: any): Promise<Observable<any>> {
    return await this.http.post(`${this.apiUrl}/signup`, value).pipe(
      tap((response: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('RegiterData', JSON.stringify(response));
        }
      })
    );
  }

  public login(value: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, value, { withCredentials: true })
      .pipe(
        tap((response: any) => {
          if (isPlatformBrowser(this.platformId)) {
            console.log("Login Response:", response);
            if (response?.token) {
              localStorage.setItem('token', response.token);
              this.setTokenInCookies(response.token);
            }
              const userData = {
              _id: response._id,
              fullname: response.fullname,
              email: response.email,
              isAdmin: response.isAdmin
            };
            localStorage.setItem('UserData', JSON.stringify(userData)); 
            console.log("Stored UserData:", JSON.stringify(userData));
  
            this.router.navigate(['/home']);
          }
        })
      );
  }
  
  selectUser(user: any): void {
    this.selectedUserSource.next(user);
  }

  public getAllUsers(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/allUser`, {
        headers: this.setHeaders(),
        withCredentials: true,
      })
      .pipe(tap((response: any) => {}));
  }
}
