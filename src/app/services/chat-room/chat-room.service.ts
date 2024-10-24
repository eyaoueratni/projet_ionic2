import { computed, inject, Injectable, signal } from '@angular/core';
import { query } from '@angular/fire/database';
import { onValue } from 'firebase/database';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
private api = inject(ApiService) ;
private auth = inject(AuthService)  ;
users= signal<any[]>([]) ;
currentUserId = computed(() => this.auth.uid()) ;
  constructor() {
    this.auth.getId() ;  
   }

   getUsers() {
    const userRef = this.api.getRef('users');
  
    // listen to realtime users list
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot?.exists()) {
          const users = snapshot.val();
          console.log(users);
          const usersArray: any[] = Object.values(users);
          console.log(usersArray);
  
          const filteredUsers = usersArray.filter(
            (user) => user.uid != this.currentUserId()
          );
  
          this.users.set(filteredUsers); 
        } else {
          this.users.set([]);
        }
      },
      (error) => {
        console.error('Error fetching real-time users list:', error);
      }
    );
  }
  async createChatRoom(
    userIds: string[],
    roomName:string,
    type:string='private'):
    Promise<any>{
    const chatRoomRef=this.api.getRef('chatrooms');
    const usersLIst=[this.currentUserId(), ...userIds];

    const sortedUsersList=usersLIst.sort();
    const usersHash=sortedUsersList.join(',');

    const exisctingChatRoomQuery= query(
      chatRoomRef,
    this.api.orderByChild('usersHash'), //query by usershash
    this.api.equalTo(usersHash)
  );
  const existingChatRoomSnapshot= await this.api.getData(exisctingChatRoomQuery);

  if (existingChatRoomSnapshot?.exists()){
    //filter the results for a private chat room
    const chatRooms=existingChatRoomSnapshot.val();
    //check for private chat room
    const privateChatRoom=Object.values(chatRooms).find((chatRoom:any)=> chatRoom.type=== 'private');
    if (privateChatRoom){
      return privateChatRoom;
    }
  }
  //if no matching private chat room exists,create a new one
  const newChatRoom=this.api.pushData(chatRoomRef);
  const chatRoomId=newChatRoom.key;
  const ChatRoomData={
    id:chatRoomId,
    users:sortedUsersList,
    usersHash,
    name:roomName,
    type,
    createdAt:new Date().toISOString(),

  }
  await this.api.setRefData(newChatRoom,ChatRoomData);
  return ChatRoomData;
    }
}