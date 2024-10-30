import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ChatRoom } from 'src/app/interfaces/chat-room';


import { NavigationExtras, Router } from '@angular/router';

import { IonModal } from '@ionic/angular';

import { addIcons } from 'ionicons';

import { ChatRoomService } from 'src/app/services/chat-room/chat-room.service';
@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],

})
export class ChatsPage implements OnInit {
 chats=Array(10);
 isNewChat = signal<boolean>(false); 
 users = computed(()=> this.chatroom.users());
 private router=inject(Router);
  private chatroom = inject(ChatRoomService);
  constructor() {
    addIcons({

    
    })
   }

  ngOnInit() {
    console.log("Chatrooms data:", this.chatrooms());
  }
 setIsNewChat(value : boolean){
  //call users data 
  if(this.users() || this.users()!.length == 0) this.chatroom.getUsers() ;
  
this.isNewChat.set(value) ; }

async startChat(user: User, modal: IonModal) {
  try {
    // Use 'displayName' instead of 'name'
    const userName = user.displayName || user.email ||  'Unknown User'; // Fallback to email if displayName is not set
    const room = await this.chatroom.createChatRoom([user.uid], userName);

    // Dismiss modal
    modal.dismiss();

    // Navigate to chat page
    const navData: NavigationExtras = {
      queryParams: {},
    };
    this.router.navigate(['/','tabs', 'chats', room?.id], navData);
  } catch (e) {
    console.error('Error starting chat:', e);
  }
}
 getChat(chatroom: ChatRoom) {
 
  
      this.navigateToChat(chatroom?.name, chatroom?.roomId);
  }
   navigateToChat(name: String | null , id:string ) {
 
    // Navigate to chat page
    const navData: NavigationExtras = {
      queryParams: {
        name
      },
    };
    this.router.navigate(['/','tabs', 'chats', id], navData);
  }
}