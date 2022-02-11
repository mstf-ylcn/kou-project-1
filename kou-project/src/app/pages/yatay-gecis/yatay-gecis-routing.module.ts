import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YatayGecisPage } from './yatay-gecis.page';

const routes: Routes = [
  {
    path: '',
    component: YatayGecisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YatayGecisPageRoutingModule {}
