import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertController } from '@ionic/angular';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';
import { alertUser } from '../../helpers/alertHandler';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})

export class QrComponent {
  constructor(
    private readonly router: Router,
    private readonly alertController: AlertController,
    private readonly storageService: StorageHandlerService
  ) {
    this.scan();
  }

  async checkPermission() {
    return new Promise(async (resolve) => {
      const { granted } = await BarcodeScanner.checkPermission({ force: true });
      if (!granted) {
        BarcodeScanner.openAppSettings();
        resolve(false);
        return;
      }
      resolve(true);
    });
  }

  async scan() {
    const allowed = await this.checkPermission();
    if (allowed) {
      BarcodeScanner.hideBackground();
      const { hasContent, content } = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      if (hasContent) {
        this.scan();
        this.storageService.set('QR_DATA', content);
        this.router.navigate(['/navigation/qr-result']);
        return;
      } 
      alertUser('Oops!', 'No hay datos QR', this.alertController);
      return;
    } 
    alertUser('Oops!', 'Se requieren permisos de cámara.', this.alertController);
  }
}
