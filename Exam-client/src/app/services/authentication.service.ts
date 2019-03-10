import { Injectable } from '@angular/core';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends DataService {
  constructor(
    httpAuth: HttpClient,
    private router: Router,
    private subjectService: SubjectService
  ) {
    super(environment.authUrl, httpAuth);
  }

  adminResetPassword(token: string, password: string): any {
    return this.http.post<any>(
      `${environment.authUrl}/admin-reset-password`,
      { token, password },
      { headers: this.getHeaders(false) }
    );
  }

  adminSendResetPasswordLink(email: string): Observable<any> {
    return this.http.post<any>(
      `${environment.authUrl}/admin-send-resetpassword-link`,
      { email },
      { headers: this.getHeaders(false) }
    );
  }

  getEmailByResetPasswordToken(token: string): Observable<any> {
    return this.http.post<any>(
      `${environment.authUrl}/admin-getemail-by-resetpassword-token`,
      { token },
      { headers: this.getHeaders(false) }
    );
  }

  studentSignUp(student: User): Observable<any> {
    return this.http
      .post<any>(
        `${environment.authUrl}/student-signup`,
        { user: student },

        { headers: this.getHeaders(false) }
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) => {
          return this.handleError(error);
        })
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details in local storage to keep user logged in between page refreshes
            localStorage.setItem(
              environment.currentUserStorageKey,
              JSON.stringify(user)
            );
          }
          return user.user;
        })
      );
  }
  /*
   adminAction(): Observable<boolean> {

    const token = localStorage.getItem(environment.tokenStorageKey);

    return this.http.get<any>(`${environment.authUrl}/admin-action`,
    {headers: this.getHeaders(true)})
    .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data) {
          console.log(data);
          return true;
      } else {
          return false;
      }
    }))
    .pipe(
      catchError((error: HttpErrorResponse, caught) =>
        this.handleError(error)
      )
    );




   }
*/

  /*
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(data.token);
    // const expirationDate = helper.getTokenExpirationDate(data.token);
    const isExpired = jwtHelper.isTokenExpired(data.token);
    if (!isExpired) {
      localStorage.setItem(environment.currentUserStorageKey, JSON.stringify(data.user));
      localStorage.setItem(environment.tokenStorageKey, data.token);
      return true;
    } else {
      return false;
    }
    */

  adminRegister(email: string, password: string, name: string) {
    return this.http
      .post(
        `${environment.authUrl}/admin-register`,
        { email, password, name },
        { headers: this.getHeaders(false) }
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  adminLogin(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(
        `${environment.authUrl}/admin-login`,
        { email, password },
        { headers: this.getHeaders(false) }
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      )
      .pipe(
        map(data => {
          console.log(data);
          localStorage.setItem(environment.tokenStorageKey, data.token);
          localStorage.setItem(
            environment.currentUserStorageKey,
            JSON.stringify(data.user)
          );
        })
      );
  }

  adminRefreshToken(): Observable<any> {
    const token = localStorage.getItem(environment.tokenStorageKey);
    return this.http
      .post<any>(
        `${environment.authUrl}/admin-refresh-token`,
        { token },
        { headers: this.getHeaders(false) }
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      )
      .pipe(
        map(data => {
          localStorage.setItem(environment.tokenStorageKey, data.newToken);
        })
      );
  }

  adminIsTokenValid(): Observable<boolean> {
    const token = localStorage.getItem(environment.tokenStorageKey);
    return this.http
      .post<boolean>(
        `${environment.authUrl}/admin-is-token-valid`,
        { token },
        { headers: this.getHeaders(false) }
      )
      .pipe(
        catchError((error: HttpErrorResponse, caught) =>
          this.handleError(error)
        )
      );
  }

  loggedInUser(): User {
    const userJSON = localStorage.getItem(environment.currentUserStorageKey);
    return JSON.parse(userJSON);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(environment.currentUserStorageKey);
    localStorage.removeItem(environment.tokenStorageKey);
    this.subjectService.currentSubject = null;
    this.router.navigate(['/login']);
  }
}
