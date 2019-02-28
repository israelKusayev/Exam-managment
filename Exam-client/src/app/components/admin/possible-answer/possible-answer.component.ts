import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PossibleAnswer } from 'src/app/models/possible-answer';

@Component({
  selector: 'app-possible-answer',
  templateUrl: './possible-answer.component.html',
  styleUrls: ['./possible-answer.component.scss']
})
export class PossibleAnswerComponent implements OnInit {
  @Input() index: number;
  @Input() model: PossibleAnswer;
  @Input() checked: boolean;
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}
  ngOnInit() {}

  sendRemove() {
    this.remove.emit(this.index);
  }
}
