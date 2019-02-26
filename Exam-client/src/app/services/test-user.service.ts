import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Test } from '../components/admin/tests-table/tests-table.component';

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
          }
        );
      },
      err => {
        console.log(err);
      }
    );
  }

  public getGrade() {
    return this.getOne(
      'get-grade' + '/' + this.test.id + '/' + this.testExecId,
      false
    );
  }

  public get test(): Test | any {
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
}
