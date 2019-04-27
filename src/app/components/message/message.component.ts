import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input()
  msg: string;

  @Output()
  dismissClick = new EventEmitter<any>();

  dismissClicked() {
    this.dismissClick.emit(null);
  }
}
