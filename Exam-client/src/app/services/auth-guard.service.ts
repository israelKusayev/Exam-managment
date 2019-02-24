import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.adminIsTokenValid().pipe(
      map(result => {
        this.auth.adminRefreshToken().subscribe();
        if (!result) {
          this.router.navigate(['login'], {
            queryParams: { returnUrl: state.url }
          });
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
