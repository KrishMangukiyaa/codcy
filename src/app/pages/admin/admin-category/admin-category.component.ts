import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CategoryService } from '../../../service/category/category.service';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../service/admin/admin.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.scss',
})
export class AdminCategoryComponent implements OnInit {
  categories: any[] = [];
  showPopup = false;

  constructor(private categoryService: AdminService, private router: Router, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  editCategory(categoryId: string): void {
    debugger
    this.router.navigate(['/admin/category/edit', categoryId]);
  }

  deleteCategory(categoryId: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(categoryId).subscribe(() => {
        this.loadCategories();
      });
    }
  }
  openPopup(route: string) {
    this.showPopup = true;
    this.router.navigate([route]);

    setTimeout(() => {
      const popupContainer = this.el.nativeElement.querySelector('.popup-container');
      const popup = this.el.nativeElement.querySelector('.popup');
      this.renderer.addClass(popupContainer, 'show');
      this.renderer.addClass(popup, 'show');
    }, 10);
  }

  closePopup() {
    const popupContainer = this.el.nativeElement.querySelector('.popup-container');
    const popup = this.el.nativeElement.querySelector('.popup');
    
    this.renderer.removeClass(popupContainer, 'show');
    this.renderer.removeClass(popup, 'show');

    setTimeout(() => {
      this.showPopup = false;
      this.router.navigate(['/admin/category']); // Reset to main category page
    }, 300);
    this.loadCategories();
  }

  toggleShowOnHome(categoryId: string) {
    this.categoryService.toggleShowOnHome(categoryId).subscribe(() => {
      this.loadCategories(); // Refresh data after update
    });
  }
}
