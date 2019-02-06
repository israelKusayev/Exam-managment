import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NotFoundError } from '../exceptions/not-found-error';
import { AppError } from '../exceptions/app-error';
import { BadInput } from '../exceptions/bad-input';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url: string, protected http: HttpClient) {}

  getHeaders(jwt: boolean): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    if (jwt) {
      // headers.append('authentication', this.jwtService.getJwt());
    }
    return headers;
  }
  getAll(jwt = true) {
    return this.http
      .get<any[]>(this.url, {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  create(resource, jwt = true) {
    return this.http
      .post(this.url, JSON.stringify(resource), {
        headers: this.getHeaders(jwt)
      })
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  update(resource, jwt = true) {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify(resource), {
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(new NotFoundError('', error));
    }
    if (error.status === 400) {
      return throwError(new BadInput(error.error.message, error));
    }
    return throwError(new AppError('connection to server faild', error));
  }
}
