import { AlertController, ToastController } from "@ionic/angular";

export const alertUser = async (_header: string, msg: string, controller: AlertController) => {
    const alert = await controller.create({
      header: _header,
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
    await alert.onDidDismiss();
}

export const alertToast = async (msg: string, controller: ToastController) => {
  const toast = await controller.create({
    message: msg,
    duration: 3000
  });
  await toast.present();
}