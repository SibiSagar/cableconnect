import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DuepayPage } from './duepay.page';

const routes: Routes = [
  {
    path: '',
    component: DuepayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DuepayPageRoutingModule {}
