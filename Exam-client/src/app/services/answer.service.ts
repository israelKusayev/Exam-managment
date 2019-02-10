import { HttpClient } from '@angular/common/http';
import { DataService } from './dataService';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnswerService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.answersUrl, httpClient);
  }
}
