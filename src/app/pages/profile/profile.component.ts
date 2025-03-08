import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../common/header/header.component';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  userData: any; // Add this to store the user details

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.selectedUser$.subscribe((user) => {
      this.userData = user; // Now `userData` is set by `selectedUser$`
      console.log('user name', this.userData);
    });
  }
  blogs = [
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      id: 2,
      content:
        'Explicabo qui fuga accusantium aliquam quos! Suscipit incidunt non, dolore vitae.',
    },
    {
      id: 3,
      content: 'Another example blog content for demonstration purposes.',
    },
  ];

  editBlog(blog: any): void {
    console.log(`Editing blog with ID: ${blog.id}`);
    // Add your edit logic here, e.g., opening a modal or navigating to an edit page.
  }
}
