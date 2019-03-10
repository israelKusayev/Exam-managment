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

  getAllBySubjectId(subjectId: number) {
    return this.getAll(true, `?subjectId=${subjectId}`);
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
}
