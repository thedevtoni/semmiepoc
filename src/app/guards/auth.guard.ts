import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserQuery } from '../store/user';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private userQuery: UserQuery, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userQuery.token().pipe(
      switchMap((token) => {
        if (token) {
          return of(true);
        }
        this.router.navigate(['login']);
        return of(false);
      })
    );
  }
}
