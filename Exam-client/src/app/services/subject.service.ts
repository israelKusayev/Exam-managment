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
  private _subjectKey = 'currentSubject';

  get subjectId(): number {
    const subject = localStorage.getItem(this._subjectKey);

    if (!subject) {
      return null;
    }
    return +JSON.parse(subject).id;
  }

  get subjectName(): string {
    const subject = localStorage.getItem(this._subjectKey);

    if (!subject) {
      return null;
    }
    return JSON.parse(subject).name;
  }

  set currentSubject(value: SubjectData) {
    if (value === null) {
      localStorage.removeItem(this._subjectKey);
    } else {
      localStorage.setItem(this._subjectKey, JSON.stringify(value));
    }
  }
}
