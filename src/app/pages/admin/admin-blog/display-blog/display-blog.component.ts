import { Component } from '@angular/core';
import { AdminService } from '../../../../service/admin/admin.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-display-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './display-blog.component.html',
  styleUrl: './display-blog.component.scss'
})
export class DisplayBlogComponent {
categoriesWithBlogs: any[] = [];
blogId: any;

  constructor(private adminservice: AdminService, private router: Router) {}
ngOnInit(): void {
  this.adminservice.getAllBlogs().subscribe(
    (categories) => {
      console.log('API Response:', categories); // ✅ Log API response
      this.categoriesWithBlogs = categories;
    },
    (error) => {
      console.error('Error fetching home categories with blogs:', error);
    }
  );
}

editBlog(blog: any, event: Event) {
  event.stopPropagation();

  if (blog._id) {  
    this.router.navigate(['/admin/blog/update-blog', blog._id], { state: { blogData: blog } });
  } else {
    console.error("Blog ID is missing:", blog);
  }
}

deleteBlog(blogId: string, event: Event) {
  event.stopPropagation(); 
  if (confirm("Are you sure you want to delete this blog?")) {
    this.adminservice.deleteBlog(blogId).subscribe(
      (response) => {
        console.log("Blog deleted successfully:", response);
        // Remove the deleted blog from the UI
        this.categoriesWithBlogs = this.categoriesWithBlogs.filter(blog => blog._id !== blogId);
      },
      (error) => {
        console.error("Error deleting blog:", error);
      }
    );
  }
}

  
    
}
