import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
declare var bootstrap: any;


@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements AfterViewInit {
  @Input() message: string = '';
  @ViewChild('toast') toastElement!: ElementRef;
  @ViewChild('toastContainer') toastContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.toastElement?.nativeElement) {
      const toastEl = this.toastElement.nativeElement;
      const containerEl = this.toastContainer.nativeElement;

      // Make it visible
      containerEl.style.display = 'block';
      setTimeout(() => (containerEl.style.opacity = '1'), 100);

      const toast = new bootstrap.Toast(toastEl);
      toast.show();

      // Remove after 5s
      setTimeout(() => {
        containerEl.style.opacity = '0';
        setTimeout(() => (containerEl.style.display = 'none'), 300);
      }, 5000);
    }
  }

}
