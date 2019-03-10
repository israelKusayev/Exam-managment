import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DataService } from './dataService';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestsAdminService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.testsAdminUrl, httpClient);
  }

  getTests(subjectId) {
    return this.getAll(true, `?subjectId=${subjectId}`);
  }
}
