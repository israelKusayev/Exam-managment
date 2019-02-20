import { Component, OnInit } from '@angular/core';
import { TestsService } from 'src/app/services/tests.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(public testsService: TestsService) {}
  currentQuestion = 0;
  firstQuestion = true;
  lastQuestion = false;
  ngOnInit() {}
  // previous() {
  //   if (this.currentQuestion > 0) {
  //     this.currentQuestion--;
  //   }
  //   if (this.currentQuestion === 0) {
  //     this.firstQuestion = true;
  //   }
  //   if (this.currentQuestion !== this.test.questions.length - 1) {
  //     this.lastQuestion = false;
  //   }
  // }
  // next() {
  //   if (this.currentQuestion < this.test.questions.length - 1) {
  //     this.currentQuestion++;
  //   }
  //   if (this.currentQuestion === this.test.questions.length - 1) {
  //     this.lastQuestion = true;
  //   }
  //   if (this.currentQuestion !== 0) {
  //     this.firstQuestion = false;
  //   }
  // }
  submit() {}

  // public get test(): any {
  //   console.log('get test in test component', this.testsService.test);

  //   return this.testsService.test;
  // }
}
