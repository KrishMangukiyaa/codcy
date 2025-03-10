import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../service/category/category.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isNavbarOpen = false;
  isDarkMode = false;
  categories: any[] = [];
  isDropdownOpen = false;
  isAdmin: boolean = false;


  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;
  }

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object,
    private categoryService: CategoryService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme === 'dark';
      this.applyTheme();
    }
  }

  ngOnInit() {
    const userData = localStorage.getItem('UserData');
    if (userData) {
      const user = JSON.parse(userData);
      this.isAdmin = user.isAdmin || false;
    }
    this.fetchCategories();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        if (Array.isArray(data)) {
          this.categories = data;
          
        } else {
          console.error('Unexpected data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
  
    );
  }
  

  openDropdown() {
    this.isDropdownOpen = true;
    console.log(this.isDropdownOpen)
  }
  
  closeDropdown() {
    this.isDropdownOpen = false;
    console.log(this.isDropdownOpen)
  }

  isAdminDropdownOpen = false;

  openAdminDropdown() {
    this.isAdminDropdownOpen = true;
  }
  
  closeAdminDropdown() {
    this.isAdminDropdownOpen = false;
  }
}
