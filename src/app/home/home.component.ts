import { Component, signal } from '@angular/core';
import { SearchTabComponent } from './search-tab/search-tab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchTabComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userDetails = signal<string>('')

  ngOnInit() {
    console.log("homepage")
  }

}
