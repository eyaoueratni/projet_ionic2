import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatsPageRoutingModule } from './chats-routing.module';

import { UsersComponent } from 'src/app/components/users/users.component';
<<<<<<< HEAD
import { EmptyScreenComponent } from "../../../components/empty-screen/empty-screen.component";
import { ChatsPage } from './chats.page';
=======
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';
>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    ChatsPageRoutingModule,
    UsersComponent,
    EmptyScreenComponent
],
=======
    ChatsPageRoutingModule ,
    UsersComponent, 
    EmptyScreenComponent ,
  ],
>>>>>>> c35dcef2ae987dec35b342b31210be521d530d66
  declarations: [ChatsPage]
})
export class ChatsPageModule {}
