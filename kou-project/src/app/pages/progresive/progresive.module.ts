import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgresivePageRoutingModule } from './progresive-routing.module';

import { ProgresivePage } from './progresive.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgresivePageRoutingModule
  ],
  declarations: [ProgresivePage]
})
export class ProgresivePageModule {}
