import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Geofence } from 'ionic-native';

import { HomePage } from '../pages/home/home';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      document.addEventListener('deviceready', function () {
        // window.geofence is now available
        Geofence.initialize().then(function () {
          console.log("Successful initialization");
        }, function (error) {
          console.log("Error", error);
        });
      }, false);


      StatusBar.styleDefault();
      Splashscreen.hide();
    });


  }
}
