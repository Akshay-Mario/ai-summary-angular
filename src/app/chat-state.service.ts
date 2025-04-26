import { Injectable, signal } from '@angular/core';
import { IChatState } from './shared/models/chat-state.model';

@Injectable({
  providedIn: 'root'
})
export class ChatStateService {

  chatState = signal<IChatState[]>([{ message: 'hey', user: true }, { message: 'hello there! add content for summarising!', user: false }]);

  constructor() { }



}
