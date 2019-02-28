import { Injectable } from '@angular/core';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.questionsUrl, httpClient);
  }

  getQuestionById(questionId) {
    return this.http
      .get<any>(environment.questionsUrl + '/question/' + questionId, {
        headers: this.getHeaders(true)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  getQuestionPossibleAnswers(questionId) {
    return this.http
      .get<any[]>(
        environment.questionsUrl + '/getQuestionPossibleAnswers/' + questionId,
        {
          headers: this.getHeaders(true)
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

   getAllBySubjectId(subjectId: string, jwt = true) {
    return this.http
      .get<any[]>(environment.questionsUrl + '/' + subjectId, {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }
}
