import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YazOkuluPage } from './yaz-okulu.page';

const routes: Routes = [
  {
    path: '',
    component: YazOkuluPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YazOkuluPageRoutingModule {}
