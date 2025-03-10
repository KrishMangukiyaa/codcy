import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../../service/blog/blog.service';
import { AdminService } from '../../../../service/admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-write-a-blog',
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './write-a-blog.component.html',
  styleUrl: './write-a-blog.component.scss'
})
export class WriteABlogComponent implements OnInit {
  @ViewChild('blogContent') blogContent!: ElementRef;
  blogForm!: FormGroup;
  categories: any[] = [];
  selectedFile: any;

  constructor(private blogService: BlogService, private adminservice: AdminService) {}

  ngOnInit(): void {
    // Initialize FormGroup
    this.blogForm = new FormGroup({
      title: new FormControl('', Validators.required),
      des: new FormControl(''),
      category: new FormControl('', Validators.required),
      tags: new FormControl(''),
      content: new FormControl(''),
      draft: new FormControl(false),
      image: new FormControl(null)
    });

    // Fetch categories from API
    this.getCategories();
  }

  getCategories() {
    this.adminservice.getCategories().subscribe((data: any) => {
      this.categories = data; // Assuming the API returns an array of categories
    });
  }

  onCategorySelect(event: any) {
    const selectedCategoryId = event.target.value;
    this.blogForm.patchValue({ category: selectedCategoryId });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  addElement(tag: string) {
    const contentArea = this.blogContent.nativeElement;

    if (tag === 'img') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.addEventListener('change', (event: any) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const img = document.createElement('img');
            img.src = reader.result as string;
            img.alt = 'Uploaded Image';
            img.style.maxWidth = '100%';
            this.blogContent.nativeElement.appendChild(img);
          };
          reader.readAsDataURL(file);
        }
      });
  
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    
    } else {
      const element = document.createElement(tag);
      element.textContent = `New ${tag} content`;
      contentArea.appendChild(element);
    }
  }


  submitBlog() {
    const formData = new FormData();    
    // Append form fields
    formData.append('title', this.blogForm.get('title')?.value);
    formData.append('des', this.blogForm.get('des')?.value);
    formData.append('category', this.blogForm.get('category')?.value);
    formData.append('tags', this.blogForm.get('tags')?.value);
    formData.append("Blog_image", this.selectedFile);
    formData.append('draft', this.blogForm.get('draft')?.value);
  
    // Append image if exists
    if (this.blogForm.get('image')?.value) {
      formData.append('image', this.blogForm.get('image')?.value);
    }
  
    // Append blog content as a string
    const contentArray: string[] = [];
    const children = this.blogContent.nativeElement.childNodes;
  
    children.forEach((child: any) => {
      if (child.nodeName === 'IMG') {
        contentArray.push(`<img src="${child.src}" alt="${child.alt}" />`);
      } else {
        contentArray.push(
          `<${child.nodeName.toLowerCase()}>${child.textContent}</${child.nodeName.toLowerCase()}>`
        );
      }
    });
  
    formData.append('content', contentArray.join(''));
  
    // Call API
    this.blogService.addBlog(formData).subscribe({
      next: (res) => {
        console.log('Blog submitted successfully', res);
      },
      error: (err) => {
        console.error('Error submitting blog:', err);
      }
    });
  }
  
}