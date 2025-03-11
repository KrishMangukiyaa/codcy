import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onLogin(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
