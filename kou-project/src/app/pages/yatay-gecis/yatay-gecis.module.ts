import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YatayGecisPageRoutingModule } from './yatay-gecis-routing.module';

import { YatayGecisPage } from './yatay-gecis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YatayGecisPageRoutingModule
  ],
  declarations: [YatayGecisPage]
})
export class YatayGecisPageModule {}
