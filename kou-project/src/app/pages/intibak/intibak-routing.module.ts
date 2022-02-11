import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntibakPage } from './intibak.page';

const routes: Routes = [
  {
    path: '',
    component: IntibakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntibakPageRoutingModule {}
