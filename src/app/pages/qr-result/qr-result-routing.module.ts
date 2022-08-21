import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrResultPage } from './qr-result.page';

const routes: Routes = [
  {
    path: '',
    component: QrResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrResultPageRoutingModule {}
