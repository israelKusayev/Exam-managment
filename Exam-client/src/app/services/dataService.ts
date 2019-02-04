import { HttpClient } from '@angular/common/http';
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

  getAll() {
    return this.http
      .get<any[]>(this.url)
      .pipe(catchError((error: Response, caught) => this.handleError(error)));
  }

  create(resource) {
    return this.http
      .post(this.url, JSON.stringify(resource))
      .pipe(catchError((error: Response, caught) => this.handleError(error)));
  }

  update(resource) {
    return this.http
      .patch(this.url + '/' + resource.id, JSON.stringify(resource))
      .pipe(catchError((error: Response, caught) => this.handleError(error)));
  }

  delete(id) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(catchError((error: Response, caught) => this.handleError(error)));
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }
    if (error.status === 400) {
      return throwError(new BadInput());
    }
    return throwError(new AppError(error));
  }
}
