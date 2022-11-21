import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseHandlerService } from 'src/app/services/database-handler.service';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  dbUsers: any;
  constructor(
    private readonly databaseService: DatabaseHandlerService,
    private readonly alertController: AlertController
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    this.dbUsers = await this.databaseService.selectUsers();
  }

  async onClick(mail: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: `'¿Estás seguro que deseas eliminar a ${mail}?'`,
      buttons: [
        {
          text: 'No',
          handler: () => {
            return;
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.databaseService.deleteUser(mail)
            this.getUsers();
          }
        }
      ]
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
