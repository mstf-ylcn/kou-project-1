import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalBasvuruPageRoutingModule } from './modal-basvuru-routing.module';

import { ModalBasvuruPage } from './modal-basvuru.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalBasvuruPageRoutingModule
  ],
  declarations: [ModalBasvuruPage]
})
export class ModalBasvuruPageModule {}
