import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { DataService } from './dataService';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService extends DataService {
  constructor(httpClient: HttpClient) {
    super(environment.certificateUrl, httpClient);
  }
}
