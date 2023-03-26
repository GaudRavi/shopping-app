import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesScreenPage } from './sales-screen.page';

const routes: Routes = [
  {
    path: '',
    component: SalesScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesScreenPageRoutingModule {}
