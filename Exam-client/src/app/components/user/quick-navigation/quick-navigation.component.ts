import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/user/question';

@Component({
  selector: 'app-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.scss']
})
export class QuickNavigationComponent implements OnInit {
  @Input() questions: Question[];
  @Output() onNavigate = new EventEmitter();
  arr: any[];
  constructor() {}

  ngOnInit() {
    this.arr = new Array(this.questions.length);
  }

  naviagte(index: number) {
    this.onNavigate.emit(index);
  }
}
