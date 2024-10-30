import { computed, inject, Injectable, signal } from '@angular/core';
<<<<<<< HEAD
import { onValue, query } from '@angular/fire/database';
=======
import { query, onValue } from '@angular/fire/database';
>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66
import { ChatRoom } from 'src/app/interfaces/chat-room';
import { ApiService } from '../api/api.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private api = inject(ApiService);
  private auth = inject(AuthService);
  
  users = signal<any[]>([]);
  chatrooms = signal<ChatRoom[] | null>([]);
  currentUserId = computed(() => this.auth.uid());

  constructor() {
    this.auth.getId();
    this.getChatRooms();
  }

  getUsers() {
    const userRef = this.api.getRef('users');
    
    // Listen to realtime updates on users list
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot?.exists()) {
          const users = snapshot.val();
          const usersArray: any[] = Object.values(users);
          
          // Filter out the current user from the list
          const filteredUsers = usersArray.filter(
            (user) => user.uid !== this.currentUserId()
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
    roomName: string,
    type: string = 'private'
  ): Promise<any> {
<<<<<<< HEAD
    try {
      const chatRoomRef = this.api.getRef('chatrooms');
      const usersList = [this.currentUserId(), ...userIds];
      const sortedUsersList = usersList.sort();
      const usersHash = sortedUsersList.join(',');
  
      // Query for an existing chat room with the same usersHash
      const existingChatRoomQuery = query(
        chatRoomRef,
        this.api.orderByChild('usersHash'),
        this.api.equalTo(usersHash)
      );
  
      const existingChatRoomSnapshot = await this.api.getData(existingChatRoomQuery);
  
      if (existingChatRoomSnapshot?.exists()) {
        const chatRooms = existingChatRoomSnapshot.val();
        const privateChatRoom = Object.values(chatRooms).find(
          (chatRoom: any) => chatRoom.type === 'private'
        );
        
        if (privateChatRoom) {
          return privateChatRoom;
        }
      }
  
      // Create a new chat room if no matching private room exists
      const newChatRoom = this.api.pushData(chatRoomRef);
      const chatRoomId = newChatRoom.key;
      const chatRoomData = {
        id: chatRoomId,
        users: sortedUsersList,
        usersHash,
        name: roomName,
        type,
        createdAt: new Date().toISOString()
      };
      
      await this.api.setRefData(newChatRoom, chatRoomData);
      return chatRoomData;
    }catch(e){
      throw (e);

    }
    
  }

  getChatRooms() {
    const chatroomsRef = this.api.getRef('chatrooms');

=======
    const chatRoomRef = this.api.getRef('chatrooms');
    const usersList = [this.currentUserId(), ...userIds];
    const sortedUsersList = usersList.sort();
    const usersHash = sortedUsersList.join(',');

    // Query for an existing chat room with the same usersHash
    const existingChatRoomQuery = query(
      chatRoomRef,
      this.api.orderByChild('usersHash'),
      this.api.equalTo(usersHash)
    );

    const existingChatRoomSnapshot = await this.api.getData(existingChatRoomQuery);

    if (existingChatRoomSnapshot?.exists()) {
      const chatRooms = existingChatRoomSnapshot.val();
      const privateChatRoom = Object.values(chatRooms).find(
        (chatRoom: any) => chatRoom.type === 'private'
      );
      
      if (privateChatRoom) {
        return privateChatRoom;
      }
    }

    // Create a new chat room if no matching private room exists
    const newChatRoom = this.api.pushData(chatRoomRef);
    const chatRoomId = newChatRoom.key;
    const chatRoomData = {
      id: chatRoomId,
      users: sortedUsersList,
      usersHash,
      name: roomName,
      type,
      createdAt: new Date().toISOString()
    };
    
    await this.api.setRefData(newChatRoom, chatRoomData);
    return chatRoomData;
  }

  getChatRooms() {
    const chatroomsRef = this.api.getRef('chatrooms');

>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66
    // Listen for real-time updates to the chatrooms list
    onValue(
      chatroomsRef,
      (snapshot) => {
        if (snapshot?.exists()) {
          const chatrooms = snapshot.val();
          const chatroomKeys = Object.keys(chatrooms);

          const chatroomData = chatroomKeys.map((roomId) => {
            const room = chatrooms[roomId];

            // Check if current user is part of chatroom
            if (room.type === 'private' && room.users.includes(this.currentUserId())) {
              // Find the other user in the chatroom
              const otherUserId = room.users.find(
                (userId: string) => userId !== this.currentUserId()
              );

              // Fetch the other user's data and the last message
<<<<<<< HEAD
              return this.getOtherUserDataAndLastMessage(otherUserId, 
                roomId, 
                room, 
                room.messages);
=======
              return this.getOtherUserDataAndLastMessage(otherUserId, roomId, room, room.messages);
>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66
            }
            return null;
          });

          // Execute all promises and filter out null results
          Promise.all(chatroomData).then((chatroomsWithDetails) => {
            const validChatrooms = chatroomsWithDetails.filter(
              (room) => room != null
            );
            this.chatrooms.set(validChatrooms as ChatRoom[]);
          })
          .catch(e => {
            console.error(e);
          });
        } else {
          this.chatrooms.set([]);
        }
      }
    );
  }

  private async getOtherUserDataAndLastMessage(
    otherUserId: string,
    roomId: string,
    room: any,
    messages: any
  ) {
    try {
      // Fetch other user's details
      const userRef = this.api.getRef(`users/${otherUserId}`);
      const snapshot = await this.api.getData(userRef);
      const user = snapshot?.exists() ? snapshot.val() : null;

      // Fetch last message from chatroom
      let lastMessage: any = null;
      if (messages) {
        const messageArray = Object.values(messages);
        const sortedMessages = messageArray.sort(
          (a: any, b: any) => b.timestamp - a.timestamp
        );
        lastMessage = sortedMessages[0];
      }

      // Return structured data for the chatroom
      const roomUserData: ChatRoom = {
        roomId ,
  name: user?.name || null ,
  photo: user?.photo || null ,
  room ,
  lastMessage : lastMessage?.message  || null  , 
  lastMessagetimestamp:   lastMessage?.timestamp || null , 
      };

      return roomUserData;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66
