import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROOT_URL } from '../tokens';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(
    @Inject(API_ROOT_URL) private baseUrl: string,
    private http: HttpClient
  ) {}

  public getAllAccounts(minState?: any, maxState?: any) {
    const params = {
      per_page: 30,
      page: 1,
      state_from: 1000,
      state_till: 3010,
    };

    return this.http.get<any>(`${this.baseUrl}/accounts`, {
      params,
    });
  }

  public getAccount(accountId: string) {
    return this.http.get<any>(`${this.baseUrl}/accounts/${accountId}`);
  }

  public getAccountGoal(accountId: string) {
    return this.http.get<any>(`${this.baseUrl}/accounts/${accountId}/goal`);
  }

  public getAccountPerformance(accountId: string) {
    return this.http.get<any>(
      `${this.baseUrl}/accounts/${accountId}/performances`
    );
  }
}
