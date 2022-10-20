import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageHandlerService } from 'src/app/services/storage-handler.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  name: string;
  email: string;
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageHandlerService,
    private readonly authService: AuthService
  ) { }

  ngOnInit() {
    this.storageService.get('SESSION_DATA').then((res) => {
      const { username, mail } = JSON.parse(res)[0]
      this.name = username;
      this.email = mail;
    });
  }

  logout(): void {
    this.router.navigate(['/login'])
    this.storageService.clear();
    this.authService.logout();
  }

}
