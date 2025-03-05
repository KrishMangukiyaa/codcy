import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryService } from '../../../service/category/category.service';
import { log } from 'console';

@Component({
  selector: 'app-catagorys',
  imports: [CommonModule],
  templateUrl: './catagorys.component.html',
  styleUrl: './catagorys.component.scss',
})
export class CatagorysComponent {
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
