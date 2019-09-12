import { environment } from '../../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map: mapboxgl.Map;
  punto: mapboxgl.Marker;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat:any;
  lon:any;
  constructor(private geolocation: Geolocation, public alertController: AlertController) {
    this.paintMap();
  }
  async paintMap(){
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'No hemos podido localizarte',
      message: 'Recuerda tener activada la ubicación en tu celular.',
      buttons: ['OK'],
      cssClass: 'alerta'
    });
    let geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [this.lon, this.lat]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      }]
    };
    this.geolocation.getCurrentPosition().then(async (resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 14.5,
        center: [this.lon, this.lat],
        attributionControl: false
      });
      this.map.addControl(new mapboxgl.NavigationControl());
      var marker = new mapboxgl.Marker({
        draggable: false
      })
      .setLngLat([this.lon, this.lat])
      .addTo(this.map);
    }).catch(async (error) => {
      alert.present();
    });
  }
  ngOnInit() {
    
  }
}
