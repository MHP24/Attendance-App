import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRI } from 'src/app/interfaces/qr.interface';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';

@Component({
  selector: 'app-qr-result',
  templateUrl: './qr-result.page.html',
  styleUrls: ['./qr-result.page.scss'],
})
export class QrResultPage implements OnInit {
  qrData: QRI;
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageHandlerService
  ) { }

  ngOnInit() {
    this.storageService.get('QR_DATA').then(res => {
      this.qrData = JSON.parse(res);
    })
  }

  onClick() {
    this.storageService.remove('QR_DATA');
    this.router.navigate(['/navigation/home'])
  }
}
