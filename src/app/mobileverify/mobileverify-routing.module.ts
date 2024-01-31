import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MobileverifyPage } from './mobileverify.page';

const routes: Routes = [
  {
    path: '',
    component: MobileverifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MobileverifyPageRoutingModule {}
