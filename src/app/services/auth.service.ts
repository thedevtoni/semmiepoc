import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenData } from '../models';
import { API_ROOT_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    @Inject(API_ROOT_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  public login(username: string, password: string) {
    return this.http.post<TokenData>(`${this.baseUrl}/oauth/token`, {
      grant_type: 'password',
      username,
      password,
      client_id: environment.client_id_web,
      client_secret: environment.client_secret_web,
    });
  }

  public refreshToken(refresh_token:string) {
    return this.http.post<TokenData>(`${this.baseUrl}/oauth/token`, {
      grant_type: 'refresh_token',
      refresh_token,
      client_id: environment.client_id_web,
      client_secret: environment.client_secret_web,
    });
  }
}
