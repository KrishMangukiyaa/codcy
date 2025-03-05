import { Component } from '@angular/core';
import { FooterService } from '../../service/footer/footer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageComponent } from "../message/message.component";


@Component({
  selector: 'app-footer',
  imports: [CommonModule, ReactiveFormsModule, MessageComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  subscribeForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  socialLinks: any = {};


  constructor(private fb: FormBuilder, private subscriptionService: FooterService) {
    this.subscribeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.subscriptionService.getSocialLinks().subscribe((data: any) => {
      this.socialLinks = data;
    });
  }


  onSubmit() {
    if (this.subscribeForm.valid) {
      this.subscriptionService.subscribess(this.subscribeForm.value.email).subscribe(
        response => this.successMessage = 'Subscribed successfully!',
        error => this.errorMessage = 'Subscription failed. Try again.'
      );
    }
  }

  handleClick(event: Event, link: string | undefined) {
    if (!link) {
      event.preventDefault(); // Prevents navigation if the link is empty
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
