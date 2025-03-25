
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
  userId: string = '';

  constructor(private blogService: BlogService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUserId(); // Get user ID from localStorage

    this.route.paramMap.subscribe(params => {
      this.blogId = params.get('id') || ''; 
      if (this.blogId) {
        this.fetchBlog();
      }
    });
  }

  getUserId(): void {
    const user = localStorage.getItem('user'); // Retrieve stored user object
    if (user) {
      this.userId = JSON.parse(user)._id; // Extract the `_id` field
    }
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
  likeBlog() {
    this.blogService.likeBlog(this.blogId, this.userId).subscribe(
      () => {
        this.blog.activity.total_likes += 1;
        this.blog.activity.likedBy.push(this.userId);
      },
      (error) => {
        console.error('Error liking the blog', error);
      }
    );
}

unlikeBlog() {
    this.blogService.unlikeBlog(this.blogId, this.userId).subscribe(
      () => {
        this.blog.activity.total_likes -= 1;
        this.blog.activity.likedBy = this.blog.activity.likedBy.filter((id: string) => id !== this.userId);
      },
      (error) => {
        console.error('Error unliking the blog', error);
      }
    );
}


}