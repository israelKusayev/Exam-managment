import {
  SimpleChanges,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Answer } from 'src/app/models/user/answer';
import { Question } from 'src/app/models/user/question';
import { TestUserService } from 'src/app/services/test-user.service';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.scss']
})
export class TestQuestionComponent implements OnInit, OnChanges {
  constructor(public testsService: TestUserService) {}
  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() firstQuestion: boolean;
  @Input() lastQuestion: boolean;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() submit = new EventEmitter();

  answers: Answer[];

  ngOnInit() {
    console.log(this.question);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.question.firstChange ||
      changes.question.previousValue.id !== changes.question.currentValue.id
    ) {
      this.answers = this.question.answers;
    }
  }

  onNext() {
    const isAnswerd = this.isAnswerd();
    if (isAnswerd || this.question.isSaved) {
      if (isAnswerd) {
        this.question.isAnswered = true;
      } else {
        this.question.isAnswered = false;
      }
      this.question.answers = this.answers;
    }
    this.next.emit(this.question);
  }
  onPrevious() {
    const isAnswerd = this.isAnswerd();
    if (isAnswerd || this.question.isSaved) {
      if (isAnswerd) {
        this.question.isAnswered = true;
      } else {
        this.question.isAnswered = false;
      }
      this.question.answers = this.answers;
    }
    this.previous.emit(this.question);
  }

  onAnswer(id: number) {
    this.answers.forEach(answer => {
      if (answer.id === id) {
        answer.selected = true;
      } else {
        answer.selected = false;
      }
    });
  }

  isAnswerd(): boolean {
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i].selected) {
        return true;
      }
    }
    // this.answers.forEach(answer => {
    //   if (answer.selected) {
    //     return true;
    //   }
    // });
    return false;
  }

  // public get test(): any {
  //   return this.testsService.test;
  // }

  onSubmit() {
    this.submit.emit();
  }
}
