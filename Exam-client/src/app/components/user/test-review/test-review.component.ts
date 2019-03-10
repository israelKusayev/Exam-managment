import { Component, OnInit, Input } from '@angular/core';
import { TestUserService } from 'src/app/services/test-user.service';
import { Utils } from '../../../helpers/utils';

@Component({
  selector: 'app-test-review',
  templateUrl: './test-review.component.html',
  styleUrls: ['./test-review.component.scss']
})
export class TestReviewComponent implements OnInit {
  testExecutionResults: any;

  constructor(public testsService: TestUserService) {
    console.log('ID = ' + this.testsService.testExecId);
    this.testsService
      .getTestExecutionResults(this.testsService.testExecId)
      .subscribe(
        data => {
          console.log('REVIEW!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          this.testExecutionResults = data;

          console.log('RESULTS:', this.testExecutionResults);
        },
        err => {
          console.log('ERROR');
          console.log(err);
        }
      );
  }

  ngOnInit() {}
}
