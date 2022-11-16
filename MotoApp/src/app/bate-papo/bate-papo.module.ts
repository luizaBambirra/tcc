import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BatePapoPageRoutingModule } from './bate-papo-routing.module';

import { BatePapoPage } from './bate-papo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BatePapoPageRoutingModule
  ],
  declarations: [BatePapoPage]
})
export class BatePapoPageModule {}
