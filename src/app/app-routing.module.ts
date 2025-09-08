import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ChatHistoryComponent } from './chat/chat-history/chat-history.component';
import { ChatInterfaceComponent } from './chat/chat-interface/chat-interface.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'chat-history', component: ChatHistoryComponent },
  { path: 'chat/:id', component: ChatInterfaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
