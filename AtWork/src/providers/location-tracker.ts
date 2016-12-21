import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { Geolocation, Geoposition, BackgroundGeolocation } from 'ionic-native';
import 'rxjs/add/operator/filter';

/*
 Class for the LocationService provider.
 @Author: Niels Bekkers
 */

@Injectable()
export class LocationTracker {

  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public afstand;

  constructor(public zone: NgZone) {

  }

  //Bereken afstand (via functie) en stop in variabele
  calculate(){
    this.startTracking();
    this.distance(51.055774, 5.287059, this.lat, this.lng, "K");
    var afstandBerekend = this.afstand;
    return afstandBerekend;
  }

  startTracking() {
    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: false,
      interval: 10000
    };
    BackgroundGeolocation.configure((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
      });
    }, (err) => {
      console.log(err);
    }, config);
    // Turn ON the background-geolocation system.
    BackgroundGeolocation.start();
    // Foreground Tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    this.watch = Geolocation.watchPosition(options).subscribe((position: Geoposition) => {
      console.log(position);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  //Functie die afstand berekent tussen 2 punten (Coordinaten) => Haversine formule
  distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    this.afstand = dist;
    return dist
  }

}
