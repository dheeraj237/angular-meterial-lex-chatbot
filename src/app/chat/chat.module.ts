import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatDialogueComponent } from './chat-dialogue/chat-dialogue.component';
import { ChatService } from './chat.service';

import { FormsModule } from '@angular/forms'

import { MaterialModule } from '../material-module'



@NgModule({
  declarations: [
    ChatDialogueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    ChatDialogueComponent
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
