import { Injectable } from '@angular/core';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.reportsUrl, httpClient);
  }

  getTestExecutionsReport(
    subjectId: number,
    testId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return this.get(
      `/test-executions-report?subjectId=${subjectId}&testId=${testId}&fromDate=${
        fromDate ? fromDate.toISOString() : ''
      }&toDate=${toDate ? toDate.toISOString() : ''}`
    );
  }

  getTestExecutionsResults(
    subjectId: number,
    testId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return this.get(
      `/test-executions-results?subjectId=${subjectId}&testId=${testId}&fromDate=${
        fromDate ? fromDate.toISOString() : ''
      }&toDate=${toDate ? toDate.toISOString() : ''}`
    );
  }

  getTestExecutionsQuestionsStats(
    subjectId: number,
    testId: number,
    fromDate: Date,
    toDate: Date
  ) {
    return this.get(
      `/test-executions-questions-stats?subjectId=${subjectId}&testId=${testId}&fromDate=${
        fromDate ? fromDate.toISOString() : ''
      }&toDate=${toDate ? toDate.toISOString() : ''}`
    );
  }
}
