import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exitoso',
      subHeader: 'Retén informado',
      message: 'La posición del retén ha sido publicada, gracias por informar a los demás.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
