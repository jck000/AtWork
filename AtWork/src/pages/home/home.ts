import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import { Headers } from '@angular/http';
import { HTTP } from 'ionic-native';
//import { Device } from 'ionic-native';
//import { TouchID } from 'ionic-native';
//import { BatteryStatus } from 'ionic-native';
import { Settings } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings = Settings;

  constructor(public navCtrl: NavController) {

  }

  GetRequest(){
    let url = 'http://192.168.0.248/api.php/werknemers';

//    var headers = new Headers({
//      'Content-Type': 'application/json',
//      'Accept': 'application/json'
//    });

    let data = {
      deviceID:"999"
    };

    HTTP.setHeader("Content-Type", "text/html");
    HTTP.setHeader("Accept", "*/*");

    HTTP.post(url, JSON.stringify(data) , {})
      .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);

      })
      .catch(error => {

        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);

      });


  }

}
