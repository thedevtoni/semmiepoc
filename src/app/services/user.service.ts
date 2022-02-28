import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models';
import { API_ROOT_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    @Inject(API_ROOT_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  public fetchCurrentUser() {
    return this.http.get<User>(`${this.baseUrl}/user`);
  }
}
