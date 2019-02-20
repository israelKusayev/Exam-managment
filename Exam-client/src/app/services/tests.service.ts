import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DataService } from './dataService';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestsService extends DataService {
  key = 'test';
  constructor(
    httpClient: HttpClient,
    private authService: AuthenticationService,
    private route: ActivatedRoute
  ) {
    super(environment.testsUrl, httpClient);
  }

  getStudentTest(id) {
    this.http
      .get<any[]>(
        `${environment.testsUrl}/${id}/${this.authService.loggedInUser().email}`
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      )
      .subscribe(data => {
        localStorage.setItem(this.key, JSON.stringify(data));
      });
  }

  getTest(): any {
    if (localStorage.getItem(this.key)) {
      return JSON.parse(localStorage.getItem(this.key));
    } else {
      return {};
    }
  }
}
