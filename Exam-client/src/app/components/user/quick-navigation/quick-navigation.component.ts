import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-navigation',
  templateUrl: './quick-navigation.component.html',
  styleUrls: ['./quick-navigation.component.scss']
})
export class QuickNavigationComponent implements OnInit {
  @Input() count: number;
  @Input() current: number;
  @Output() onNavigate = new EventEmitter();
  arr: any[];
  constructor() {}

  ngOnInit() {
    this.arr = new Array(this.count);
  }

  naviagte(index: number) {
    this.onNavigate.emit(index);
  }
}
