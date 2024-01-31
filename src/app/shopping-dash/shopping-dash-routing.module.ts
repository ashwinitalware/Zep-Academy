import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingDashPage } from './shopping-dash.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingDashPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingDashPageRoutingModule {}
