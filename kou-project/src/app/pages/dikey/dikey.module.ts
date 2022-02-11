import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DikeyPageRoutingModule } from './dikey-routing.module';

import { DikeyPage } from './dikey.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DikeyPageRoutingModule
  ],
  declarations: [DikeyPage]
})
export class DikeyPageModule {}
