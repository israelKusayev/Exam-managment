import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { SubjectData } from '../components/admin/organization/organization.component';

@Injectable({
  providedIn: 'root'
})
export class SubjectService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.subjectUrl, httpClient);
  }
  currentSubject: SubjectData;
}
