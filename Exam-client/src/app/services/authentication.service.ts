import { Injectable } from '@angular/core';
import { DataService } from './dataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends DataService {

  constructor( httpAuth: HttpClient) {
    super(environment.authUrl, httpAuth );
   }


   studentSignUp(student: User) {

    return this.http.post<User>(`${environment.authUrl}/student-signup`, JSON.stringify(student))
    .pipe(map(user => {

        // login successful if there's a jwt token in the response
        if (user) {
            user.isAdmin = false;
            // store user details in local storage to keep user logged in between page refreshes
            localStorage.setItem(environment.currentUserStorageKey, JSON.stringify(user));
        }
        return user;
    }));
   }

   adminAction(): Observable<boolean> {

    const token = localStorage.getItem(environment.tokenStorageKey);

    let h: HttpHeaders = new HttpHeaders();
    h = h.append('Content-Type', 'application/json');
    h = h.append('x-auth-token', token);
    return this.http.get<any>(`${environment.authUrl}/admin-action`,
    {headers: h})
    .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data) {
          console.log(data);
          return true;
      } else {
          return false;
      }
    }));




   }
   adminLogin(email: string, password: string): Observable < boolean > {
    let h: HttpHeaders = new HttpHeaders();
    h = h.append('Content-Type', 'application/json');
    return this.http.post<any>(`${environment.authUrl}/admin-login`, { email, password },
    {headers: h})
    .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.token && data.user) {
          const jwtHelper = new JwtHelperService();
          const decodedToken = jwtHelper.decodeToken(data.token);
          // const expirationDate = helper.getTokenExpirationDate(data.token);
          const isExpired = jwtHelper.isTokenExpired(data.token);
          if (!isExpired) {
            localStorage.setItem(environment.currentUserStorageKey, JSON.stringify(data.user));
            localStorage.setItem(environment.tokenStorageKey, data.token);


            let hh: HttpHeaders = new HttpHeaders();
    hh = hh.append('Content-Type', 'application/json');
    hh = hh.append('x-auth-token', data.token);
     this.http.get<any>(`${environment.authUrl}/admin-action`,
    {headers: hh}).subscribe();


    return true;
          } else {
            return false;
          }

      } else {
        return false;
      }
    }));
   }

   logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(environment.currentUserStorageKey);
    localStorage.removeItem(environment.tokenStorageKey);
}
}
