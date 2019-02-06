import { HttpClient } from '@angular/common/http';
import { DataService } from './dataService';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService extends DataService {
  constructor(private httpClient: HttpClient) {
    super(environment.languageUrl, httpClient);
  }
}
