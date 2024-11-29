import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrpagePageRoutingModule } from './qrpage-routing.module';

import { QRPage } from './qrpage.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrpagePageRoutingModule,
    QrCodeModule
  ],
  declarations: [QRPage]
})
export class QrpagePageModule {}
