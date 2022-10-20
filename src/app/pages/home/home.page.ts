import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController} from '@ionic/angular';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
  @ViewChild('pageTitle', { read: ElementRef, static: true }) pageTitle: ElementRef;

  username: string;
  constructor(
    private readonly router: Router,
    private readonly animationController: AnimationController,
    private readonly storageService: StorageHandlerService
  ) { }

  ngOnInit() {
    this.storageService.get('SESSION_DATA').then((res) => {
      const { username } = JSON.parse(res)[0];
      this.username = username;
    });
  }

  ngAfterViewInit() {
    const animation = this.animationController
    .create()
    .addElement(this.pageTitle.nativeElement)
    .iterations(1)
    .duration(400)
    .fromTo('transform', 'translateX(100%)', 'translate(0%)')
    animation.play();
  }

  onClick(): void {
    this.router.navigate(['navigation/scanner'])
  }
}