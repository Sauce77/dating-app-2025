import { Component, inject, signal } from '@angular/core';
import { MessageService } from '../../core/service/message-service';
import { PaginationResult } from '../../types/paginationMetadata';
import { Message } from '../../types/message';

@Component({
  selector: 'app-messages',
  imports: [],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {
  private messagesService = inject(MessageService);
  protected container = 'inbox';
  protected pageNumber = 1;
  protected pageSize = 10;
  protected paginatedMessage = signal<PaginationResult<Message> | null>(null);

  ngOnInit(): void {
    throw new Error("Method not implemented.")
  }
  
  loadMessage() {
    this.messagesService.getMessages(this.container, this.pageNumber, this.pageSize).suscribe({
      next: 
    });
  }
}
