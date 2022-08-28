import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('enterView', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate(400, style({
          transform: 'translateX(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})

export class HomePage implements OnInit {
  username: string;
  constructor(private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe( params => {
      const { name } = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
      this.username = name;
    });

    /* Local storage method */
    // this.username = JSON.parse(localStorage.getItem('user')).name;
  }

  onClick(): void {
    this.router.navigate(['navigation/scanner'])
  }
}