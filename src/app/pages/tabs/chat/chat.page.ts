import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { ChatService } from './../../../services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  name = signal<string | null>(null);
  id = signal<string | null>(null);
  message = signal<string | null>(null);
  
  private route = inject(ActivatedRoute);
  private chatService = inject(ChatService);
  chats=computed(()=>this.chatService.chatMessages());
  constructor() { 
    addIcons({});
  }

  ngOnInit() {
    const data: any = this.route.snapshot.queryParams;
    if (data?.name) {
      this.name.set(data.name);
    }
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }
    this.id.set(id);
    this.chatService.getChatMessages(id);
  }

  async sendMessage() {
    // Only proceed if there is a message
    if (!this.message() || this.message()?.trim() === '') {
      return;
    }
    try {
      await this.chatService.sendMessage(this.id()!, this.message()!);
      this.message.set(''); // Clear the message input after sending
    } catch (e) {
      console.log(e);
    }
  }
}
