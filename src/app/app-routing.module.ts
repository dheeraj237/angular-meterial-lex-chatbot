import { NgModule } from '@angular/core';
import { Routes, RouterModule, ɵROUTER_PROVIDERS } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChatDialogueComponent } from './chat/chat-dialogue/chat-dialogue.component';

const routes: Routes = [
  { path: '', redirectTo: '/chatbot', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'chatbot', component: ChatDialogueComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
