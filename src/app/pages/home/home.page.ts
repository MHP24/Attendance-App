import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})

export class HomePage implements OnInit {
  @ViewChild('pageTitle', { read: ElementRef, static: true}) pageTitle: ElementRef;

  username: string;
  constructor(private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly animationController: AnimationController) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( () => {
      const { name } = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
      this.username = name;
    });

    /* Local storage method */
    // this.username = JSON.parse(localStorage.getItem('user')).name;
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