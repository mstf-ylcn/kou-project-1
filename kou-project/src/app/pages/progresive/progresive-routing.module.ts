import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgresivePage } from './progresive.page';

const routes: Routes = [
  {
    path: '',
    component: ProgresivePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgresivePageRoutingModule {}
