import { DatePipe } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone: true,
  imports: [IonicModule,DatePipe], // Import IonicModule here
})
export class ChatBoxComponent implements OnInit {
  chat=input <Chat | null>(null);

  constructor() { }

  ngOnInit() {}
}
