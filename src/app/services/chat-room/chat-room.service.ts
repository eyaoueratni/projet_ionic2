import { ThisReceiver } from '@angular/compiler';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../api/api.service';
import { onValue } from 'firebase/database'; 
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
}