import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string;
  constructor(private readonly router: Router) { }
  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user')).name;
  }

  onClick(): void {
    this.router.navigate(['navigation/scanner'])
  }
}
