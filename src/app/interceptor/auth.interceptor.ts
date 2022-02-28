import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserQuery, UserStore } from '../store/user';

const REFRESH_TOKEN_THRESHOLD = 600;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private userQuery: UserQuery,
    private userStore: UserStore,
    private authService: AuthService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.userQuery.token().pipe(
      switchMap((token) => {
        const tokenIsExpired =
          !!token && this.isTokenExpired(token.created_at, token.expires_in);

        if (tokenIsExpired) {
          return this.refreshToken(token.refresh_token);
        }

        return of(token);
      }),

      switchMap((token) => {
        if (token) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${token.access_token}` },
          });
        }

        return next.handle(req);
      })
    );
  }

  private isTokenExpired(created_at: number, expires_in: number): boolean {
    return (
      Math.round(new Date().getTime() / 1000) - created_at >
      expires_in - REFRESH_TOKEN_THRESHOLD
    );
  }

  private refreshToken(refresh_token: string) {
    return this.authService
      .refreshToken(refresh_token)
      .pipe(tap((tokenData) => this.userStore.update({ tokenData })));
  }
}
