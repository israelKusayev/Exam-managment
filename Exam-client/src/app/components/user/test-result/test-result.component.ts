import { Component, OnInit } from '@angular/core';
import { TestUserService } from 'src/app/services/test-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.scss']
})
export class TestResultComponent implements OnInit {
  grade: number;
  nCorrectAnswers: number;
  nQuestions: number;
  passingGrade: number;
  showAnswersOnCompletion: boolean;
  nQuestionsAnswered: number;

  constructor(public testsService: TestUserService, private router: Router) {}

  ngOnInit() {
    console.log(this.testsService.testExecId);
    this.testsService
      .finishTestExecution(this.testsService.testExecId)
      .subscribe(data => {
        console.log('finishTestExecution');
        console.log('finishTestExecution');
        console.log('finishTestExecution');
        console.log('finishTestExecution');

        console.log(data);
        this.grade = data.grade;
        this.nCorrectAnswers = data.numOfCorrectAnswers;
        this.nQuestions = data.numOfTestQuestions;
        this.passingGrade = data.passingGrade;
        this.showAnswersOnCompletion = data.showAnswers;
        this.nQuestionsAnswered = data.numOfQuestionsAnswered;
        console.log(data);
      });
  }
  reviewResults() {
    this.router.navigate(['user-test-review/']);
  }
}
