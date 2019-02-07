import { Injectable } from '@angular/core';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.questionsUrl, httpClient);
  }
}
