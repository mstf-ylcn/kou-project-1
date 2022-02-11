import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BasvurularimPageRoutingModule } from './basvurularim-routing.module';

import { BasvurularimPage } from './basvurularim.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BasvurularimPageRoutingModule
  ],
  declarations: [BasvurularimPage]
})
export class BasvurularimPageModule {}
