import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotFoundError } from '../exceptions/not-found-error';
import { AppError } from '../exceptions/app-error';
import { BadInput } from '../exceptions/bad-input';
import { environment } from 'src/environments/environment';
import { UnauthorizedError } from '../exceptions/unauthroized-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(protected url: string, protected http: HttpClient) {}

  getHeaders(jwt: boolean): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (jwt) {
      headers = headers.append(
        environment.auth_headerKey,
        localStorage.getItem(environment.tokenStorageKey)
      );
    }

    return headers;
  }

  getOne(urlParameterName: string, jwt = true) {
    return this.http
      .get<any>(this.url + '/' + urlParameterName, {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  getAll(jwt = true, queryParams = '') {
    return this.http
      .get<any[]>(this.url + queryParams, {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  get(queryParams = '', jwt = true) {
    return this.http
      .get<any>(this.url + queryParams, {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  create(resource: any, jwt = true, queryParams = '') {
    console.log('add:');
    console.log(resource);
    return this.http
      .post(this.url + queryParams, JSON.stringify(resource), {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  update(id: string, resource: any, jwt = true) {
    return this.http
      .put(this.url + '/' + id, JSON.stringify(resource), {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  delete(id, jwt = true) {
    return this.http
      .delete(this.url + '/' + id, {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(new NotFoundError('', error));
    } else if (error.status === 400) {
      return throwError(new BadInput(error.error.message, error));
    } else if (error.status === 401) {
      return throwError(new UnauthorizedError('', error));
    }
    return throwError(new AppError('connection to server failed', error));
  }
}
