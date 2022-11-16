import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BatePapoPage } from './bate-papo.page';

const routes: Routes = [
  {
    path: '',
    component: BatePapoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BatePapoPageRoutingModule {}
