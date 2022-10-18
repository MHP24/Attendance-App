import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';

import { ScannerPage } from './scanner.page';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { QrComponent } from 'src/app/components/qr/qr.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule
  ],
  declarations: [ScannerPage, ButtonComponent, QrComponent]
})
export class ScannerPageModule {}
