import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, NgModule } from '@angular/core';

import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsComponent {
  constructor(private navController: NavController) {}

  back() {
    this.navController.navigateBack('/tabs/tab1');
  }
}

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: AccountsComponent }]),
  ],
  declarations: [AccountsComponent],
})
export class AccountsModule {}
