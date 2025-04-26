import { Component, Signal } from '@angular/core';
import { ChatStateService } from '../../chat-state.service';
import { IChatState } from '../../shared/models/chat-state.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-display.component.html',
  styleUrl: './chat-display.component.scss'
})
export class ChatDisplayComponent {

  chatMessages: Signal<IChatState[]>;

  constructor(private chatService: ChatStateService) {
    this.chatMessages = this.chatService.chatState;
  }



}
