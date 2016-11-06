import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import { Headers } from '@angular/http';
import { HTTP } from 'ionic-native';
//import { Device } from 'ionic-native';
//import { TouchID } from 'ionic-native';
//import { BatteryStatus } from 'ionic-native';
import { Settings } from '../settings/settings';
import { RequestToApi } from '../../providers/request-to-api';
import { GeofenceService } from '../../providers/geofence-service';
import { Geofence, TouchID, PinDialog } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings = Settings;

  constructor(public navCtrl: NavController, public requestToApi: RequestToApi, public geofenceService: GeofenceService) {

  }

  post(){
    this.requestToApi.postRequest();
  }

  delete(){
    this.requestToApi.deleteRequest();
  }

  enter(){
    this.geofenceService.AddZones();
  }

  touchID(){

    TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
      'Scan vingerafdruk / Voer code in!',
      'Code invoeren')
      .then(
        res => this.available(),
        err => this.notAvailable()
      );

    //PinDialog Werkt niet?

    /*PinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel'])
      .then(
        (result: any) => {
          if (result.buttonIndex == 1) console.log('User clicked OK, value is: ', result.input1);
          else if(result.buttonIndex == 2) console.log('User cancelled');
        }
      );*/
  }

  available(){
    alert("Succes!");
  }
  notAvailable(){
    alert("Niet Beschikbaar!");
  }


}

