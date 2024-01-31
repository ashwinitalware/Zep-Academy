import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingDashPageRoutingModule } from './shopping-dash-routing.module';

import { ShoppingDashPage } from './shopping-dash.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingDashPageRoutingModule
  ],
  declarations: [ShoppingDashPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ShoppingDashPageModule {}
