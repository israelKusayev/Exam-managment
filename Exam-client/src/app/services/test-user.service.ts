import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Test } from '../components/admin/tests-table/tests-table.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestUserService extends DataService {
  constructor(
    httpClient: HttpClient,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    super(environment.testsUserUrl, httpClient);
  }
  key = 'test';

  getStudentTest(id) {
    const email = this.authService.loggedInUser().email;
    this.getOne(id + '/' + email, false).subscribe(
      data => {
        this.test = data;
        this.create({}, false, `?userId=${email}&testId=${data.id}`).subscribe(
          data2 => {
            localStorage.setItem('testExec', data2[0].id.toString());
            localStorage.setItem('testEnd', 'false');
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  finishTestExecution(testExecutionId) {
    return this.get(`/finish-test-execution/${testExecutionId}`);
  }

  getTestExecutionResults(testExecutionId) {
    return this.get(`/test-execution-results/${testExecutionId}`);
  }

  public get test(): any {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key));
    } else {
      return {};
    }
  }

  public set test(test: any) {
    localStorage.setItem(this.key, JSON.stringify(test));
  }

  public get testExecId(): number {
    return +localStorage.getItem('testExec');
  }

  public get grade(): string {
    return localStorage.getItem('grade');
  }
  public get corectCount(): string {
    return localStorage.getItem('correctCount');
  }

  public get testEnd(): boolean {
    const p = localStorage.getItem('testEnd') === 'true';
    console.log(p);
    return p;
  }
}
