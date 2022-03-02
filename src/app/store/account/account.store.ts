import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export type AccountState = EntityState<any, number>;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'accounts' })
export class AccountStore extends EntityStore<AccountState> {
  constructor() {
    super();
  }
}
