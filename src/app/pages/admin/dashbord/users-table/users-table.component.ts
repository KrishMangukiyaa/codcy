import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../service/admin/admin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-table',
  imports: [CommonModule, FormsModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];

  constructor(private adminservice: AdminService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminservice.getAllUsers().subscribe(
      (response) => {
        this.users = response.map((user: any) => ({
          ...user,
          selected: false,
        }));
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  selectAll(event: any) {
    this.users.forEach((user) => (user.selected = event.target.checked));
  }
}
