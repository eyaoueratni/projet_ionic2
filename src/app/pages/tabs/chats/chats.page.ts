import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
 users = computed(()=> this.chatroom.users())  ;
  private chatroom = inject(ChatRoomService);
  constructor() {
    addIcons({

    
    })
   }

  ngOnInit() {
  }
 setIsNewChat(value : boolean){
  //call users data 
  if(this.users() || this.users()!.length == 0) this.chatroom.getUsers() ;
  
this.isNewChat.set(value) ; 
 }
}
