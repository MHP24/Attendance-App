import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { DatabaseHandlerService } from './services/database-handler.service';
import { StorageHandlerService } from './services/storage-handler.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private databaseService: DatabaseHandlerService,
    private storeService: StorageHandlerService,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async() => {
      await this.databaseService.initDB();
      await this.storeService.init();
      await this.authService.initializeAuthentication();
    });
  }
}