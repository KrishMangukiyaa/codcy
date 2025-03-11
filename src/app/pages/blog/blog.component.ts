
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../service/blog/blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blog: any;
  blogId: string = '';

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get blog ID from route
    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id') || ''; // Get the dynamic ID from the URL
      if (this.blogId) {
        this.fetchBlog();
      }
    });
  }

  fetchBlog() {
    this.blogService.getBlogById(this.blogId).subscribe(
      (data) => {
        this.blog = data;
      },
      (error) => {
        console.error('Error fetching blog data', error);
      }
    );
  }
}