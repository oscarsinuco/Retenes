import { environment } from '../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 7.127029;
  lng = -73.118675;
  constructor() { }

  ngOnInit() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 12,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
    }));
  }

}
