import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailPageRoutingModule } from './mail-routing.module';

import { MailPage } from './mail.page';
import { ButtonComponent } from 'src/app/components/button/button.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MailPage, ButtonComponent]
})
export class MailPageModule {}
