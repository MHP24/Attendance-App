import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForumPageRoutingModule } from './forum-routing.module';
import { ForumPage } from './forum.page';
import { ForumCardComponent } from 'src/app/components/forum-card/forum-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForumPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ForumPage, ForumCardComponent]
})
export class ForumPageModule {}
