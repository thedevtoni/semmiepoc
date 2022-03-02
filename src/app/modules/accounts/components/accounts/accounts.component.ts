import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AccountService } from 'src/app/services';
import { AccountQuery, AccountStore } from 'src/app/store/account';

const DEFAULT_IMAGE =
  'https://staging.semmie.nl/web/assets/images/accountPlaceholder.jpg';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent implements OnInit {
  public accounts$ = this.accountQuery.selectAll();
  public defaultImage = DEFAULT_IMAGE;

  constructor(
    private accountService: AccountService,
    private accountStore: AccountStore,
    private accountQuery: AccountQuery
  ) {}

  ngOnInit() {
    this.accountService
      .getAllAccounts()
      .pipe(
        take(1),
        map((result) => result.accounts)
      )
      .subscribe((accounts) => this.accountStore.add(accounts));
  }
}
