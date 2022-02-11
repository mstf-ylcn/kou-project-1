import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalBasvuruPage } from './modal-basvuru.page';

const routes: Routes = [
  {
    path: '',
    component: ModalBasvuruPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalBasvuruPageRoutingModule {}
