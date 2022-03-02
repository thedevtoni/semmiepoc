import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'accounts',
        loadChildren: () =>
          import('../accounts/accounts.module').then((m) => m.AccountsModule),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: 'tab4',
        loadChildren: () =>
          import('../tab4/tab4.module').then((m) => m.Tab4PageModule),
      },
      {
        path: 'tab5',
        loadChildren: () =>
          import('../tab5/tab5.module').then((m) => m.Tab5PageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/accounts',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/accounts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
