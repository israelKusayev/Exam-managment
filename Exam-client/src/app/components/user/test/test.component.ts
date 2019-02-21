import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerService } from './../../../services/answer.service';
import { TestUserService } from './../../../services/test-user.service';
import { Question } from 'src/app/models/user/question';
import { TestStudent } from '../../../models/user/test';
import { Answer } from './../../../models/user/answer';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(
    public testsService: TestUserService,
    private answerService: AnswerService,
    private router: Router
  ) {}
  currentQuestion = 0;
  firstQuestion = true;
  lastQuestion = false;
  ngOnInit() {}
  previous(answer: Answer) {
    this.lastQuestion = false;
    if (this.currentQuestion === 0) {
      this.router.navigate(['test', this.testsService.test.id, 'instructions']);
    }
    if (this.currentQuestion > 0) {
      this.currentQuestion--;
    }
    if (this.currentQuestion === 0) {
      this.firstQuestion = true;
    }
  }
  next(question: Question) {
    if (question.isAnswered && !question.isSaved) {
      this.answerService
        .create(
          {
            testExecutionId: this.testsService.testExecId,
            questionId: question.id,
            answerIds: question.answers.filter(a => a.selected).map(a => a.id)
          },
          false
        )
        .subscribe(() => {
          const test = this.test;
          question.isSaved = true;
          test.questions[this.currentQuestion] = question;
          this.testsService.test = test;
        });
    } else if (question.isSaved) {
      this.answerService
        .update(
          `${this.testsService.testExecId}/${question.id}/${question.id}`,
          {},
          false
        )
        .subscribe(() => {
          const test = this.test;
          question.isSaved = true;
          test.questions[this.currentQuestion] = question;
          this.testsService.test = test;
        });
    }
    this.firstQuestion = false;
    if (this.currentQuestion < this.test.questions.length - 1) {
      this.currentQuestion++;
    }
    if (this.currentQuestion === this.test.questions.length - 1) {
      this.lastQuestion = true;
    }
  }
  submit() {}

  public get test(): TestStudent {
    return this.testsService.test;
  }
}
