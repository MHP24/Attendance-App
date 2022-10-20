import { Component, Input, OnInit } from '@angular/core';
import { QRI } from 'src/app/interfaces/qr.interface';

@Component({
  selector: 'app-qr-card',
  templateUrl: './qr-card.component.html',
  styleUrls: ['./qr-card.component.scss'],
})
export class QrCardComponent implements OnInit {
  @Input() qrData: QRI;
  constructor() { }

  ngOnInit() {}

}
