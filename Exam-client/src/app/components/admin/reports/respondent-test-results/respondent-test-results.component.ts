import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import { group } from '@angular/animations';
import { Utils } from '../../../../helpers/utils';

@Component({
  selector: 'app-respondent-test-results',
  templateUrl: './respondent-test-results.component.html',
  styleUrls: ['./respondent-test-results.component.scss']
})
export class RespondentTestResultsComponent implements OnInit {
  @Input() testExecutionResults: any[];
  @Input() showQuestionIds = true;
  model: any;
  questions: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private reportsService: ReportsService
  ) {}

  ngOnInit() {
    console.log('RESULTS!!!!!!!!!!!!!!');
    console.log(this.testExecutionResults);
    const grouped = Utils.groupBy(this.testExecutionResults, [
      'QuestionId',
      'QuestionTitle',
      'QuestionTextBelow',
      'TestExecutionId'
    ]);
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(grouped);

    for (const x of Object.keys(grouped)) {
      this.questions.push([JSON.parse(x), grouped[x]]);
    }

    console.log('QUESTIONS:');
    console.log(this.questions);
  }
}
