import { registerLocaleData } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import localeNL from '@angular/common/locales/nl';
import {
  APP_INITIALIZER,
  DEFAULT_CURRENCY_CODE,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EMPTY } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticatedGuard } from './guards';
import { AuthInterceptor } from './interceptor';
import { User } from './models';
import { UserStore } from './store/user';
import { API_ROOT_URL } from './tokens';

registerLocaleData(localeNL, 'nl');

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function getUser(http: HttpClient, userStore: UserStore) {
  return () =>
    http.get<User>(`${environment.baseUrl}/user`).pipe(
      take(1),
      tap((user) => userStore.update({ user })),
      catchError(() => {
        userStore.update({ user: null, tokenData: null });
        return EMPTY;
      })
    );
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    environment.production ? [] : AkitaNgDevtools.forRoot({ name: 'semmie' }),
  ],
  providers: [
    AuthenticatedGuard,
    AuthInterceptor,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: API_ROOT_URL, useValue: environment.baseUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [HttpClient, UserStore],
      useFactory: getUser,
    },
    {
      provide: LOCALE_ID,
      useValue: 'nl',
    },
    FingerprintAIO,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
