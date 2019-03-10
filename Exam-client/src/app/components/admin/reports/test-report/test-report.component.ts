import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from 'src/app/services/reports.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  TestExecution,
  TestReportHeader,
  TestExecutionDetail
} from 'src/app/models/user/test-report';
import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { Utils } from 'src/app/helpers/utils';

@Component({
  selector: 'app-test-report',
  templateUrl: './test-report.component.html',
  styleUrls: ['./test-report.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', visibility: 'hidden' })
      ),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TestReportComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private reportsService: ReportsService,
    private subjectService: SubjectService
  ) {}
  testId: any;
  fromDate: Date = null;
  toDate: Date = null;
  expandedElement: any;

  header: TestReportHeader = new TestReportHeader();
  testExecutions: TestExecution[] = [];
  testExecutionsResults: any[] = [];
  testExecutionsResultsDataSource: DataSourceWithDetailRows;

  questionsStats: any[] = [];
  questionsStatsDataSource: DataSourceWithDetailRows;

  testExecutionsResultsdisplayedColumns: string[] = [
    'id',
    'respondent',
    'submitted',
    'numOfQuestionsAnswered',
    'grade'
  ];
  questionsStatsDisplayedColumns: string[] = [
    'id',
    'question',
    'numOfSubmissions',
    'correctlyAnsweredPercentage'
  ];
  @Input() model: any;

  isExpansionDetailRow = (i: number, row: Object) =>
    row.hasOwnProperty('detailRow');

  showRepondentTestResults(row) {
    if (row && row.Id) {
      console.log(row.Id);
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.testId = params['testId'];
      this.fromDate = params['fromDate'] ? new Date(params['fromDate']) : null;
      this.toDate = params['toDate'] ? new Date(params['toDate']) : null;
      console.log(this.testId);
      console.log(this.fromDate);
      console.log(this.toDate);

      this.reportsService
        .getTestExecutionsReport(
          this.subjectService.subjectId,
          this.testId,
          this.fromDate,
          this.toDate
        )
        .subscribe(data => {
          this.header = data.header;
          this.testExecutions = data.testExecutions;

          this.reportsService
            .getTestExecutionsResults(
              this.subjectService.subjectId,
              this.testId,
              this.fromDate,
              this.toDate
            )
            .subscribe((results: TestExecutionDetail[]) => {
              this.testExecutionsResults = results;
              console.log('REPORT!!!!!!!!!!!!!!!!!!!!!');
              this.testExecutions.forEach(element => {
                element.Details = results.filter(
                  a => a.TestExecutionId === element.Id
                );
              });

              this.testExecutionsResultsDataSource = new DataSourceWithDetailRows(
                this.testExecutions
              );
            });
        });

      this.reportsService
        .getTestExecutionsQuestionsStats(
          this.subjectService.subjectId,
          this.testId,
          this.fromDate,
          this.toDate
        )
        .subscribe(data => {
          console.log(data);

          this.questionsStats = Utils.groupByIntoArray(
            data,
            [
              'QuestionId',
              'QuestionTitle',
              'QuestionTextBelow',
              'QuestionTags',
              'NumOfSubmissions',
              'CorrectlyAnsweredPercentage'
            ],
            'Details'
          );

          console.log(this.questionsStats);
          this.questionsStatsDataSource = new DataSourceWithDetailRows(
            this.questionsStats
          );
        });
    });
  }
}

export class DataSourceWithDetailRows extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  constructor(private data: any[]) {
    super();
  }
  connect(): Observable<Element[]> {
    const rows = [];
    this.data.forEach(element =>
      rows.push(element, { detailRow: true, element })
    );
    console.log('ROWS:');
    console.log(rows);
    return of(rows);
  }

  disconnect() {}
}
