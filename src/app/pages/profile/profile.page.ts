import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string;
  email: string;
  picture: string;
  constructor(private readonly router: Router) { }

  ngOnInit() {
    /* Local storage method */
    this.name = JSON.parse(localStorage.getItem('user')).name;
    this.email = JSON.parse(localStorage.getItem('user')).email;
    this.picture = JSON.parse(localStorage.getItem('user')).picture;
  }

  logout(): void {
    this.router.navigate(['/login'])
    localStorage.clear();
  }

}
