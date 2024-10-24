import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, output, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true, 
  imports:[CommonModule, IonicModule] ,
})
export class UsersComponent  implements OnInit {
  users=input<any[]>([]) ;

  @Output() close = new EventEmitter<boolean>();
  user = output<User>();
  constructor() {
    
   }

  ngOnInit() {}
  closeModal() {
    this.close.emit(true)  ;
  }
 startChat(user :User){
  this.user.emit(user);
 }
 
}

