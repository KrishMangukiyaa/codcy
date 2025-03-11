import { Component, OnInit } from '@angular/core';
import { LatestComponent } from '../../common/latest/latest.component';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../service/admin/admin.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-catagory',
  imports: [LatestComponent, CommonModule, RouterLink],
  templateUrl: './catagory.component.html',
  styleUrl: './catagory.component.scss',
})
export class CatagoryComponent implements OnInit {
  blogs: any[] = [];
  categoryId: string = '';
  categoryName: string = '';
  categoryDescription: string = '';
  categoryColor: string = '';

  constructor(
    private blogService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.categoryId = params.get('id') || '';
          return this.blogService.getCategoryBlogs(this.categoryId);
        })
      )
      .subscribe(
        (response) => {
          if (response.length > 0) {
            this.categoryName = response[0].category.name;
            this.categoryDescription = response[0].category.description;
            this.categoryColor = response[0].category.color;
          } else {
            this.categoryName = '';
            this.categoryDescription = '';
            this.categoryColor = '';
          }

          this.blogs = response.map((blog) => ({
            title: blog.title,
            image: blog.Blog_image,
            blogId: blog._id,
            content: blog.content[0],
            category: blog.category.name,
            categoryColor: blog.category.color,
            views: blog.views,
            comments: blog.comments.length + ' Comments',
            readTime: '5 min read',
            author: 'Unknown Author',
            date: new Date(blog.publishedAt).toDateString(),
          }));
        },
        (error) => {
          console.error('Error fetching blogs:', error);
        }
      );
  }
}
