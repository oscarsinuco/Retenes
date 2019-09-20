import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FirestoreService } from '../services/firestore/firestore.service';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public data: any;
  item: Observable<any[]>;
  // tslint:disable-next-line: max-line-length
  constructor(db: AngularFirestore, private platform: Platform,private network: Network, public alertController: AlertController, private geolocation: Geolocation, private firestoreService: FirestoreService) {
    this.item = db.collection("root").snapshotChanges();
    this.item.subscribe((datos)=>{
      datos.forEach((dato)=>{
        console.log(dato.payload.doc.data());
      });
    });
  }
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
    this.platform.ready().then(()=>{
      var options = {
        timeout: 20000
      }
      this.geolocation.getCurrentPosition().then(async (resp) => {
        lat = resp.coords.latitude;
        lon = resp.coords.longitude;
        this.data = {
          latitud: lat,
          longitud: lon
        };
        if (this.firestoreService.pushPosition(this.data)) {
          await alert.present();
        }
      }).catch(async (error) => {
        await bad_alert.present();
      });
    });
  }
}
