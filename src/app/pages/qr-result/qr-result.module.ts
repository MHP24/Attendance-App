import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrResultPageRoutingModule } from './qr-result-routing.module';

import { QrResultPage } from './qr-result.page';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { QrCardComponent } from 'src/app/components/qr-card/qr-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrResultPageRoutingModule
  ],
  declarations: [QrResultPage, ButtonComponent, QrCardComponent]
})
export class QrResultPageModule {}
