import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { NavigationPage } from './navigation.page';

const routes: Routes = [
  {
    path: '',
    component: NavigationPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../../pages/home/home.module').then( m => m.HomePageModule),
        canActivate: [RouteGuardService]
      },
      {
        path: 'scanner',
        loadChildren: () => import('../../pages/scanner/scanner.module').then( m => m.ScannerPageModule),
        canActivate: [RouteGuardService]
      },
      {
        path: 'profile',
        loadChildren: () => import('../../pages/profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [RouteGuardService]
      },
      {
        path: 'qr-result',
        loadChildren: () => import('../../pages/qr-result/qr-result.module').then( m => m.QrResultPageModule),
        canActivate: [RouteGuardService]
      },
      {
        path: 'forum',
        loadChildren: () => import('../../pages/forum/forum.module').then( m => m.ForumPageModule),
        canActivate: [RouteGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavigationPageRoutingModule {}
