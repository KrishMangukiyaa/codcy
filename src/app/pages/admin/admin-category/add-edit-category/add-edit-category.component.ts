import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../service/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.scss'
})
export class AddEditCategoryComponent   implements OnInit {
  categoryForm!: FormGroup;
  editMode = false;
  categoryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      color: ['', Validators.required],
      description: ['', Validators.required],
    });

    // Check if in Edit mode
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.editMode = true;
        this.loadCategoryData();
      }
    });
  }

  // Load existing category data for editing
  loadCategoryData(): void {
    this.categoryService.getCategoryById(this.categoryId!).subscribe((category) => {
      this.categoryForm.patchValue({
        name: category.name,
        color: category.color,
        description: category.description,
      });
    });
  }

  // Handle form submission for Insert & Update
  onSubmit(): void {
    if (this.editMode) {
      // Update category
      this.categoryService.updateCategory(this.categoryId!, this.categoryForm.value).subscribe(() => {
        this.router.navigate(['/admin/category']); // Redirect after update
      });
    } else {
      // Insert new category
      this.categoryService.createCategory(this.categoryForm.value).subscribe(() => {
        this.router.navigate(['/admin/category']); // Redirect after insert
      });
    }
  }
}
