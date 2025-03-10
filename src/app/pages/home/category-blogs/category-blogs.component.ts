import { Component } from '@angular/core';
import { CategoryService } from '../../../service/category/category.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-blogs',
  imports: [CommonModule, RouterLink],
  templateUrl: './category-blogs.component.html',
  styleUrl: './category-blogs.component.scss'
})
export class CategoryBlogsComponent {
  categoriesWithBlogs: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getHomeCategories().subscribe(
      (categories) => {
        this.categoriesWithBlogs = categories.map(category => ({
          ...category,
          blogs: category.blogs.slice(0, 3)
        }));
      },
      (error) => {
        console.error('Error fetching home categories with blogs:', error);
      }
    );
  }
    }