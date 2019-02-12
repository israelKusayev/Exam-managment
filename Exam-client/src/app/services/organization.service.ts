import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends DataService implements OnInit {
  constructor(httpClient: HttpClient) {
    super(environment.organizationUrl, httpClient);
    console.log('something');
  }
  ngOnInit() {}
}
