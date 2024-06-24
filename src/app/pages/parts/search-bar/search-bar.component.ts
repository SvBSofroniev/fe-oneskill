import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Output() messageEvent = new EventEmitter<string>();
  criteriaObj: any = {
    value: ''
  }

  onSearch() {
    this.messageEvent.emit(this.criteriaObj.value);
  }
}
