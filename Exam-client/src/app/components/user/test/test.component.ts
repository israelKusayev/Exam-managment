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
  answeredCount: number;

  ngOnInit() {}

  previous(question: Question) {
    this.lastQuestion = false;
    this.saveAnswers(question, this.decrementQuestion);
  }

  next(question: Question) {
    this.firstQuestion = false;
    this.saveAnswers(question, this.incrementQuestion);
  }

  submit(question: Question) {
    this.saveAnswers(question, this.openDialog);
  }

  incrementQuestion = () => {
    this.navigate(this.currentQuestion + 1);
  }

  decrementQuestion = () => {
    if (this.currentQuestion === 0) {
      this.router.navigate(['test', this.testsService.test.id, 'instructions']);
    }
    this.navigate(this.currentQuestion - 1);
  }

  saveAnswers(question: Question, navigationFunc) {
    if (question.isAnswered || question.isSaved) {
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
          this.answeredCount = this.test.questions.filter(
            a => a.isAnswered
          ).length;
          //
          navigationFunc();
        });
    } else {
      navigationFunc();
    }
  }

  private openDialog = () => {
    const dialog = this.dialog.open(SubmitDialogComponent, {
      position: { top: '0%' },
      data: { id: this.test.id }
    });
    dialog.afterClosed().subscribe(data => {
      if (data === 'yes') {
        this.getGrade();
      }
    });
  }

  getGrade() {
    this.testsService.getGrade().subscribe(data => {
      console.log(data);
    });
  }

  navigate(index: number) {
    this.currentQuestion = index;
    this.firstQuestion = false;
    this.lastQuestion = false;

    if (this.currentQuestion === 0) {
      this.firstQuestion = true;
    }
    if (this.currentQuestion === this.test.questions.length - 1) {
      this.lastQuestion = true;
    }
  }

  public get test(): TestStudent {
    return this.testsService.test;
  }
}
