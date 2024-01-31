import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileverifyPageRoutingModule } from './mobileverify-routing.module';

import { MobileverifyPage } from './mobileverify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileverifyPageRoutingModule
  ],
  declarations: [MobileverifyPage]
})
export class MobileverifyPageModule {}
