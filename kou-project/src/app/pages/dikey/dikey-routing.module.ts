import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DikeyPage } from './dikey.page';

const routes: Routes = [
  {
    path: '',
    component: DikeyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DikeyPageRoutingModule {}
