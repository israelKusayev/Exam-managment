import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './dataService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestsService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.testsUrl, httpClient);
  }
}
