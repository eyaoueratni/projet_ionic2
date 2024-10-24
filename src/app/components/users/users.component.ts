import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';

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
  constructor() {
    
   }

  ngOnInit() {}
  closeModal() {
    this.close.emit(true)  ;
  }

}

