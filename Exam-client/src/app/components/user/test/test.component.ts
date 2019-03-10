import { MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnswerService } from './../../../services/answer.service';
import { TestUserService } from './../../../services/test-user.service';
import { Question } from 'src/app/models/user/question';
import { TestStudent } from '../../../models/user/test';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  constructor(
    public testsService: TestUserService,
    private answerService: AnswerService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  currentQuestion = 0;
  firstQuestion = true;
  lastQuestion = false;
  answeredCount = 0;
  ngOnInit() {}

  previous(question: Question) {
    this.lastQuestion = false;
    this.saveAnswers(question, this.decrementQuestion);
  }
  next(question: Question) {
    this.firstQuestion = false;
    this.saveAnswers(question, this.incrementQuestion);
  }

  incrementQuestion = () => {
    if (this.currentQuestion < this.test.questions.length - 1) {
      this.currentQuestion++;
    }
    if (this.currentQuestion === this.test.questions.length - 1) {
      this.lastQuestion = true;
    }
  }

  decrementQuestion = () => {
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

  saveAnswers(question: Question, navigationFunc) {
    console.log('QUESTION: ' + question.title);
    console.log(question);
    if (question.isAnswered || question.isSaved) {
      this.answerService
        .create(
          {
            testExecutionId: this.testsService.testExecId,
            questionId: question.id,
            answers: question.answers.map(a => ({
              answerId: a.id,
              answer: a.selected ? true : false
            }))
          },
          false
        )
        .subscribe(() => {
          const test = this.test;
          question.isSaved = true;
          test.questions[this.currentQuestion] = question;
          this.testsService.test = test;
          this.answeredCount = this.test.questions.filter(
            q => q.isAnswered
          ).length;
          //
          navigationFunc();
        });
    } else {
      navigationFunc();
    }
  }

  submit() {
    this.dialog
      .open(SubmitDialogComponent, { position: { top: '0%' } })
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/test-result']);
        }
      });
  }

  navigateToQuestion(index) {
    this.currentQuestion = index;
    this.firstQuestion = false;
    this.lastQuestion = false;
    if (index === 0) {
      this.firstQuestion = true;
    } else if (index === this.test.questions.length - 1) {
      this.lastQuestion = true;
    }
  }
  public get test(): TestStudent {
    return this.testsService.test;
  }
}
