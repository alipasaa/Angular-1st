import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatHistoryService } from '../chat-history.service';
import { Conversation } from '../chat.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrl: './chat-history.component.css'
})
export class ChatHistoryComponent implements OnInit {
  conversations$: Observable<Conversation[]>;
  searchQuery = '';
  filteredConversations: Conversation[] = [];

  constructor(
    private chatHistoryService: ChatHistoryService,
    private router: Router
  ) {
    this.conversations$ = this.chatHistoryService.getConversations();
  }

  ngOnInit(): void {
    this.conversations$.subscribe(conversations => {
      this.filteredConversations = conversations;
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.filteredConversations = this.chatHistoryService.searchConversations(this.searchQuery);
    } else {
      this.conversations$.subscribe(conversations => {
        this.filteredConversations = conversations;
      });
    }
  }

  viewConversation(conversation: Conversation): void {
    this.router.navigate(['/chat', conversation.id]);
  }

  deleteConversation(conversation: Conversation, event: Event): void {
    event.stopPropagation();
    if (confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε τη συνομιλία "${conversation.title}"?`)) {
      this.chatHistoryService.deleteConversation(conversation.id);
    }
  }

  startNewChat(): void {
    this.router.navigate(['/chat/new']);
  }

  goToProducts(): void {
    this.router.navigate(['/']);
  }
}
