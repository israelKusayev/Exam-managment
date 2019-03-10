import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { TestsAdminService } from 'src/app/services/tests-admin.service';
import { ReportsService } from 'src/app/services/reports.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  tests: any[];
  selectedTestId: any;
  fromDate: Date = null;
  toDate: Date = null;
  constructor(
    public subjectService: SubjectService,
    private testsService: TestsAdminService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.testsService
      .getTests(this.subjectService.subjectId)
      .subscribe(data => {
        this.tests = data;
      });
    // this.tests = [{ id: 1, name: 'test 1' }, { id: 2, name: 'test 2' }];
  }

  FromDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.fromDate = event.value;
  }
  ToDateChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.toDate = event.value;
  }

  generateReportByTest() {
    this.router.navigate(['test-report'], {
      queryParams: {
        testId: this.selectedTestId,
        fromDate: this.fromDate,
        toDate: this.toDate
      }
    });
    console.log(this.selectedTestId);
  }
}
