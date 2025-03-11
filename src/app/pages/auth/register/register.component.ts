import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      profile_img: [null], // File input
      bio: [''],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async register() {
    if (this.registerForm.invalid) {
      alert('Form is invalid');
      return;
    }
  
    const formData = new FormData();
    formData.append('fullname', this.registerForm.value.fullname);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);
    formData.append('bio', this.registerForm.value.bio);
    if (this.selectedFile) {
      formData.append('profile_img', this.selectedFile);
    }
  
    (await this.userService.register(formData)).subscribe({
      next: (res) => {
        alert('Registration successful');
      },
      error: (err) => {
        console.error(err);
        alert('Registration failed');
      },
    });
  }
  
}
