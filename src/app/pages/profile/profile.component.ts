import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  isUpdated = false;
  userId!: string;

  constructor(
    private profileService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') || '';
      if (this.userId) {
        this.initForm();
        this.fetchProfile();
      }
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.isUpdated = true;
    });
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      fullname: [''],
      email: [''],
      bio: [''],
      profile_img: [''],
      youtube: [''],
      instagram: [''],
      facebook: [''],
      twitter: [''],
      github: [''],
      website: [''],
    });
  }

  fetchProfile(): void {
    this.profileService.getProfile(this.userId).subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          fullname: data.personal_info.fullname,
          email: data.personal_info.email,
          bio: data.personal_info.bio,
          profile_img: 'http://localhost:4002' + data.personal_info.profile_img,
          youtube: data.social_links.youtube,
          instagram: data.social_links.instagram,
          facebook: data.social_links.facebook,
          twitter: data.social_links.twitter,
          github: data.social_links.github,
          website: data.social_links.website,
        });
        this.isUpdated = false; // Reset update flag after fetching
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      },
    });
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.profileService
        .updateProfile(this.userId, this.profileForm.value)
        .subscribe({
          next: () => {
            alert('Profile updated successfully!');
            this.isUpdated = false; // Hide update button
          },
          error: (error) => {
            console.error('Error updating profile:', error);
          },
        });
    }
  }
}
