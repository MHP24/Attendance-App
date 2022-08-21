import { AlertController } from "@ionic/angular";

export const alertUser = async (_header: string, msg: string, controller: AlertController) => {
    const alert = await controller.create({
      header: _header,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
    await alert.onDidDismiss();
}