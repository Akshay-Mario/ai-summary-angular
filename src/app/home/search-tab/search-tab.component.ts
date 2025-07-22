import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoResizeDirective } from '../../directive/auto-resize.directive';
import { ChatStateService } from '../../chat-state.service';

@Component({
  selector: 'app-search-tab',
  standalone: true,
  imports: [FormsModule, AutoResizeDirective],
  templateUrl: './search-tab.component.html',
  styleUrl: './search-tab.component.scss'
})
export class SearchTabComponent {

  searchText: string = '';

  @ViewChild('autoResizeTextArea') textarea !: ElementRef<HTMLTextAreaElement>;


  constructor(private chatService: ChatStateService) {

  }

  ngAfterViewInit() {
    console.log("after view in it")
    this.textarea.nativeElement.focus();
  }


  // resizeTextarea(): void {
  //   const textarea = this.textarea.nativeElement;
  //   textarea.style.height = 'auto'; // reset height
  //   textarea.style.height = `${textarea.scrollHeight}px`;
  // }


  onSubmit() {
    this.chatService.chatState.update(m => [
      ...m,
      { message: this.searchText, user: true },
      { message: "loading...", user: false }])
    this.searchText = '';
  }

  handleEnter(event: KeyboardEvent) {
    if (event.key == 'Enter' && !event.shiftKey && this.searchText.length > 0) {
      event.preventDefault();
      this.onSubmit();
      this.textarea.nativeElement.style.height = 'auto'
    }
  }

}

