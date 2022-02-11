import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DuyurularPageRoutingModule } from './duyurular-routing.module';

import { DuyurularPage } from './duyurular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DuyurularPageRoutingModule
  ],
  declarations: [DuyurularPage]
})
export class DuyurularPageModule {}
