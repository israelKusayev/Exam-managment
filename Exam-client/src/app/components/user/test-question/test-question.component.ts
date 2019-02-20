import { TestsService } from 'src/app/services/tests.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss']
})
export class TestQuestionComponent implements OnInit {
  constructor(public testsService: TestsService) {}
  @Input() question: any;
  @Input() firstQuestion: boolean;
  @Input() lastQuestion: boolean;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();
  // answers: any[];
  // questionId: number;
  // isCorrect: boolean;
  public get answers1(): {
    id: number;
    title: string;
  }[] {
    return [
      { id: 1, title: 'rere' },
      { id: 1, title: 'ewe' },
      { id: 1, title: 'rerewre' }
    ];
  }

  // answers: { title: string; id: number; isCorrect: boolean }[];
  answers;
  a: any;

  ngOnInit() {
    this.answers = this.question.answers;
    console.log(this.answers);

    console.log('the question', this.question);
    // this.answers = this.question.answers;
  }

  onNext() {
    this.next.emit();
  }
  onPrevious() {
    this.previous.emit();
  }

  // public get test(): any {
  //   return this.testsService.test;
  // }
}
