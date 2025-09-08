import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Conversation, ChatMessage } from './chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatHistoryService {
  private readonly STORAGE_KEY = 'chat_conversations';
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  public conversations$ = this.conversationsSubject.asObservable();

  constructor() {
    this.loadConversations();
  }

  private loadConversations(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        const conversations = JSON.parse(stored).map((conv: any) => ({
          ...conv,
          createdAt: new Date(conv.createdAt),
          updatedAt: new Date(conv.updatedAt),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        this.conversationsSubject.next(conversations);
      } catch (error) {
        console.error('Error loading conversations:', error);
        this.conversationsSubject.next([]);
      }
    } else {
      // Create sample conversation if none exist
      this.createSampleConversation();
    }
  }

  private saveConversations(conversations: Conversation[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(conversations));
    this.conversationsSubject.next(conversations);
  }

  private createSampleConversation(): void {
    const sampleConversation: Conversation = {
      id: '1',
      title: 'Πρώτη Συνομιλία - Angular Project',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      messages: [
        {
          id: '1',
          text: 'Γεια σας! Θέλω να δημιουργήσω ένα Angular project.',
          sender: 'user',
          timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        },
        {
          id: '2',
          text: 'Γεια σας! Θα σας βοηθήσω να δημιουργήσετε ένα Angular project. Τι είδους εφαρμογή θέλετε να φτιάξετε;',
          sender: 'assistant',
          timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 + 60000)
        },
        {
          id: '3',
          text: 'Θέλω μια εφαρμογή για προϊόντα με φίλτρα τιμών.',
          sender: 'user',
          timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 + 120000)
        },
        {
          id: '4',
          text: 'Τέλεια! Θα δημιουργήσουμε μια εφαρμογή με λίστα προϊόντων και φίλτρα. Θα χρησιμοποιήσουμε Angular Material για το UI.',
          sender: 'assistant',
          timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000 + 180000)
        }
      ]
    };
    this.saveConversations([sampleConversation]);
  }

  getConversations(): Observable<Conversation[]> {
    return this.conversations$;
  }

  getConversation(id: string): Conversation | undefined {
    return this.conversationsSubject.value.find(conv => conv.id === id);
  }

  createConversation(title: string): Conversation {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const conversations = [...this.conversationsSubject.value, newConversation];
    this.saveConversations(conversations);
    return newConversation;
  }

  addMessageToConversation(conversationId: string, message: ChatMessage): void {
    const conversations = this.conversationsSubject.value.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          messages: [...conv.messages, message],
          updatedAt: new Date()
        };
      }
      return conv;
    });
    this.saveConversations(conversations);
  }

  deleteConversation(id: string): void {
    const conversations = this.conversationsSubject.value.filter(conv => conv.id !== id);
    this.saveConversations(conversations);
  }

  searchConversations(query: string): Conversation[] {
    const lowercaseQuery = query.toLowerCase();
    return this.conversationsSubject.value.filter(conv =>
      conv.title.toLowerCase().includes(lowercaseQuery) ||
      conv.messages.some(msg => msg.text.toLowerCase().includes(lowercaseQuery))
    );
  }
}
