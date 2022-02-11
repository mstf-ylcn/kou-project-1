import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YazOkuluPageRoutingModule } from './yaz-okulu-routing.module';

import { YazOkuluPage } from './yaz-okulu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YazOkuluPageRoutingModule
  ],
  declarations: [YazOkuluPage]
})
export class YazOkuluPageModule {}
