import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsPageRoutingModule } from './chats-routing.module';

import { ChatsPage } from './chats.page';
import { UsersComponent } from 'src/app/components/users/users.component';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPageRoutingModule ,
    UsersComponent, 
    EmptyScreenComponent ,
  ],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
