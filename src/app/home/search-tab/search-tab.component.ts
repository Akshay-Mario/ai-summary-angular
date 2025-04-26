import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoResizeDirective } from '../../directive/auto-resize.directive';

@Component({
  selector: 'app-search-tab',
  standalone: true,
  imports: [FormsModule, AutoResizeDirective],
  templateUrl: './search-tab.component.html',
  styleUrl: './search-tab.component.scss'
})
export class SearchTabComponent {

  searchText = signal<string>('');

  @ViewChild('autoResizeTextArea') textarea !: ElementRef<HTMLTextAreaElement>;


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
    console.log("hryy", this.searchText())
    this.searchText.set('');
  }

  handleEnter(event: KeyboardEvent) {
    if(event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
      this.textarea.nativeElement.style.height = 'auto'
    }
  }

}

