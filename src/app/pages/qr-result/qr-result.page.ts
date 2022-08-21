import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRI } from 'src/app/interfaces/qr.interface';

@Component({
  selector: 'app-qr-result',
  templateUrl: './qr-result.page.html',
  styleUrls: ['./qr-result.page.scss'],
})
export class QrResultPage implements OnInit {
  qrData: QRI;
  constructor(private readonly router: Router) { }

  ngOnInit() {
    this.qrData = JSON.parse(localStorage.getItem('course'));
  }

  onClick() {
    this.router.navigate(['/navigation/home'])
  }
}
