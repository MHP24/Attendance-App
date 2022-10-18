import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageHandlerService } from './storage-handler.service';
import { DatabaseHandlerService } from './database-handler.service';
import { AlertController } from '@ionic/angular';
import { alertUser } from 'src/app/helpers/alertHandler';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authState = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private storage: StorageHandlerService,
    private databaseService: DatabaseHandlerService,
    private readonly alertController: AlertController
  ) { }

  initializeAuthentication(): Promise<boolean> {
    return new Promise(async resolve => {
      try {
        this.checkSession();
        return Promise.resolve(true);
      } catch(err) {
        return Promise.resolve(false);
      };
    });
  }

  checkSession() {
    this.storage.get("SESSION_DATA").then((res) => {
      if(res.length > 0) {
        this.authState.next(true)
        this.router.navigate(['/navigation/home']);
      };
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  async login(mail: string, password: string) { 
    try {
      this.databaseService.loginUser(mail, password).then(res => {
        if(res.length > 0) {
          this.storage.set("SESSION_DATA", JSON.stringify(res));
          this.authState.next(true);
          this.router.navigate(['/navigation/home']);
          return;
        }
        alertUser('Error al iniciar sesión', 'Usuario o clave incorrecta', this.alertController);
      });
    } catch(err) {
      alertUser('Error al iniciar sesión', JSON.stringify(err), this.alertController);
    }
  }

  logout() {
    this.authState.next(false)
  }
}
