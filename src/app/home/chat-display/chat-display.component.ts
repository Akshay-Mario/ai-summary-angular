import { Component, effect, ElementRef, Signal, ViewChild } from '@angular/core';
import { IChatState } from '../../shared/models/chat-state.model';
import { CommonModule } from '@angular/common';
import { ChatStateService } from '../../service/chat-state.service';

@Component({
  selector: 'app-chat-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-display.component.html',
  styleUrl: './chat-display.component.scss'
})
export class ChatDisplayComponent {

  chatMessages: Signal<IChatState[]>;
  scrollNow: boolean = false;

  @ViewChild('bottom') bottomDiv !: ElementRef<HTMLDivElement>;

  constructor(private chatService: ChatStateService) {
    this.chatMessages = this.chatService.chatState;
    effect(() => {
      const messages = this.chatService.chatState();
      if (messages.length > 0) {
        this.scrollNow = true;
      }
    })
  }

  ngAfterViewChecked() {
    if(this.scrollNow){
      this.scrollToView();
      this.scrollNow = false;
    }
  }

  scrollToView() {
    if (this.bottomDiv)
      this.bottomDiv.nativeElement.scrollIntoView({ behavior: 'smooth' })
  }

}
