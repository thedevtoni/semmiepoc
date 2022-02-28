import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { User } from 'src/app/models';
import { TokenData } from '../../models/auth';

export interface UserState {
  user?: User;
  tokenData: TokenData | null;
}

export const initialState = {
  tokenData: JSON.parse(localStorage.getItem('onyxx')) ?? null,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends Store<UserState> {
  constructor() {
    super(initialState);
  }

  updateToken(tokenData: TokenData) {
    this.update({ tokenData });
    localStorage.setItem('onyxx', JSON.stringify(tokenData));
  }
}
