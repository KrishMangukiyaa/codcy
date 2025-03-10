import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { ChatService } from '../../service/chat/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-chat',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef; // Add ViewChild

  messages: { sender: string; text: string }[] = [];
  input: string = '';
  userId: string | null = null;
  private platformId = inject(PLATFORM_ID);

  isChatOpen = false;

  constructor(private chatbotService: ChatService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('UserData');
      if (userData) {
        this.userId = JSON.parse(userData)._id;
      }
      this.getChatHistory();
    }
  }

  getChatHistory(): void {
    this.chatbotService.getChatHistory().subscribe(
      (history) => {
        this.messages = history;
        setTimeout(() => this.scrollToBottom(), 0); // Scroll after messages load
      },
      (error) => {
        console.error('Error fetching chat history:', error);
      }
    );
  }

  sendMessage(): void {
    if (!this.input.trim() || !this.userId) return;

    this.messages.push({ sender: 'user', text: this.input });
    const userMessage = this.input;
    this.input = '';

    this.chatbotService.sendMessage(this.userId, userMessage).subscribe(
      (response) => {
        if (response.aiResponse) {
          this.messages.push({ sender: 'ai', text: response.aiResponse });
        }
        setTimeout(() => this.scrollToBottom(), 100); // Scroll after message is sent
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatContainer) {
        this.chatContainer.nativeElement.scrollTo({
          top: this.chatContainer.nativeElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    setTimeout(() => this.scrollToBottom(), 100);
  }
}
