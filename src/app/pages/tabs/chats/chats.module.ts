import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsPageRoutingModule } from './chats-routing.module';

import { UsersComponent } from 'src/app/components/users/users.component';
import { EmptyScreenComponent } from "../../../components/empty-screen/empty-screen.component";
import { ChatsPage } from './chats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsPageRoutingModule,
    UsersComponent,
    EmptyScreenComponent
],
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
