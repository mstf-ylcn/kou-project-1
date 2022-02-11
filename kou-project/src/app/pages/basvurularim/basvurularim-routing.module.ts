import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasvurularimPage } from './basvurularim.page';

const routes: Routes = [
  {
    path: '',
    component: BasvurularimPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasvurularimPageRoutingModule {}
