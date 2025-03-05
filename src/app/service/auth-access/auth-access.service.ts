import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';


@Injectable({
  providedIn: 'root'
})
export class AuthAccessService {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token') || Cookies.get('jwtToken');
      if (token) {
        return true; // User is authenticated
      } else {
        this.router.navigate(['/login']); // Redirect to login if no token
        return false;
      }
    }
    return false; // For server-side rendering or when no token is available
  }
}
