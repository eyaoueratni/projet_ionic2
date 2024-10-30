import { computed, inject, Injectable, signal } from '@angular/core';
import { onValue } from '@angular/fire/database';
import { Chat } from 'src/app/interfaces/chat';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatMessages=signal<Chat[] | null>([]);
  private api=inject(ApiService);
  currentUserId = computed(() => this.auth.uid());
  private auth = inject(AuthService);
  constructor() { 
    this.auth.getId();
   // this.getChatMessages();
  }
  
  async sendMessage(chatroomId: string, message: string) {
    try {
      const chatsRef = this.api.getRef(`chatrooms/${chatroomId}/messages`);
      
      // Prepare message object
      const chatData: Chat = {
        senderId: this.currentUserId()!,
        message,
        timestamp: Date.now(),
      };
      
      // Push the new message to the chatroom's node and set its data
      const newMessageRef = await this.api.pushData(chatsRef);
      await this.api.setRefData(newMessageRef, chatData);
      
    } catch (e) {
      console.error("Error in sendMessage:", e); // Log the error for debugging
      throw e;
    }
  }
  getChatMessages(chatroomId:string) {
    const chatsRef = this.api.getRef(`chatrooms/${chatroomId}/messages`);
     //listen for realtime updates to the chat messages 
     onValue(chatsRef,(snapshot)=>{
      if (snapshot?.exists()) {
        const messages = snapshot.val();
        const messagesArray: Chat[]=Object.keys(messages).map(
          messagesId=>({
          id: messagesId,
          ...messages[messagesId],
          isCurrentUser:messages[messagesId].senderId==this.currentUserId() ? true : false,
        }));
      this.chatMessages.set(messagesArray);
      }else{
        this.chatMessages.set([])
      }

     },(error)=>{
      console.error(error);
     });
  }
 
}
  

