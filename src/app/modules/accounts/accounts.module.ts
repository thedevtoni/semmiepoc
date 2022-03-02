import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { AccountsComponent } from './components/accounts/accounts.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: AccountsComponent },
      { path: ':id', component: AccountDetailComponent },
    ]),
  ],
  declarations: [AccountsComponent, AccountDetailComponent],
})
export class AccountsModule {}
