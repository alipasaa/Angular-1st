import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatHistoryService } from '../chat-history.service';
import { Conversation, ChatMessage } from '../chat.model';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrl: './chat-interface.component.css'
})
export class ChatInterfaceComponent implements OnInit {
  conversation: Conversation | null = null;
  newMessage = '';
  isNewConversation = false;
  conversationTitle = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chatHistoryService: ChatHistoryService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id === 'new') {
        this.isNewConversation = true;
        this.conversationTitle = 'Νέα Συνομιλία';
      } else {
        this.conversation = this.chatHistoryService.getConversation(id);
        if (!this.conversation) {
          this.router.navigate(['/chat-history']);
        }
      }
    });
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) return;

    if (this.isNewConversation) {
      // Create new conversation
      this.conversation = this.chatHistoryService.createConversation(
        this.conversationTitle || 'Νέα Συνομιλία'
      );
      this.isNewConversation = false;
      this.router.navigate(['/chat', this.conversation.id], { replaceUrl: true });
    }

    if (this.conversation) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      };

      this.chatHistoryService.addMessageToConversation(this.conversation.id, message);
      
      // Simulate assistant response
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: this.generateAssistantResponse(this.newMessage),
          sender: 'assistant',
          timestamp: new Date()
        };
        
        if (this.conversation) {
          this.chatHistoryService.addMessageToConversation(this.conversation.id, assistantMessage);
          // Refresh conversation data
          this.conversation = this.chatHistoryService.getConversation(this.conversation.id);
        }
      }, 1000);

      // Refresh conversation data
      this.conversation = this.chatHistoryService.getConversation(this.conversation.id);
    }

    this.newMessage = '';
  }

  private generateAssistantResponse(userMessage: string): string {
    const responses = [
      'Κατανοώ την ερώτησή σας. Μπορώ να σας βοηθήσω περισσότερο με αυτό.',
      'Αυτό είναι ένα ενδιαφέρον θέμα. Ας το εξερευνήσουμε παραπάνω.',
      'Βάσει αυτών που μου λέτε, προτείνω να δούμε τις ακόλουθες επιλογές.',
      'Έχω κατανοήσει. Ας προχωρήσουμε βήμα βήμα.',
      'Αυτό που περιγράφετε είναι συνηθισμένο. Ας δούμε πώς μπορούμε να το επιλύσουμε.'
    ];

    if (userMessage.toLowerCase().includes('angular')) {
      return 'Το Angular είναι ένα εξαιρετικό framework! Μπορώ να σας βοηθήσω με οποιαδήποτε ερώτηση έχετε σχετικά με την ανάπτυξη.';
    }

    if (userMessage.toLowerCase().includes('προϊόν') || userMessage.toLowerCase().includes('φίλτρ')) {
      return 'Για τα φίλτρα προϊόντων, μπορούμε να χρησιμοποιήσουμε Angular Material components για ένα καλύτερο UI/UX.';
    }

    return responses[Math.floor(Math.random() * responses.length)];
  }

  goToHistory(): void {
    this.router.navigate(['/chat-history']);
  }

  goToProducts(): void {
    this.router.navigate(['/']);
  }

  deleteConversation(): void {
    if (this.conversation && confirm(`Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη συνομιλία;`)) {
      this.chatHistoryService.deleteConversation(this.conversation.id);
      this.router.navigate(['/chat-history']);
    }
  }
}
