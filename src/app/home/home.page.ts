import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FirestoreService } from '../services/firestore/firestore.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public data: any;
  constructor(public alertController: AlertController, private geolocation: Geolocation, private firestoreService: FirestoreService) {}
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Exitoso',
      subHeader: 'Retén informado',
      message: 'La posición del retén ha sido publicada, gracias por informar a los demás.',
      buttons: ['OK'],
      cssClass: 'alerta'
    });
    const bad_alert = await this.alertController.create({
      header: 'Fallido',
      subHeader: 'Retén informado',
      message: 'La posición del retén ha sido publicada, gracias por informar a los demás.',
      buttons: ['OK'],
      cssClass: 'alerta'
    });
    let lat: any;
    let lon: any;
    this.geolocation.getCurrentPosition().then(async (resp) => {
      lat = resp.coords.latitude;
      lon = resp.coords.longitude;
      this.data = {
        latitud: lat,
        longitud: lon
      };
      if (this.firestoreService.pushPosition(this.data)) {
        await alert.present();
      } else {
        console.log('Mal');
      }
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
}
