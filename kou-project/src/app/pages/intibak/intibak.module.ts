import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntibakPageRoutingModule } from './intibak-routing.module';

import { IntibakPage } from './intibak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntibakPageRoutingModule
  ],
  declarations: [IntibakPage]
})
export class IntibakPageModule {}
