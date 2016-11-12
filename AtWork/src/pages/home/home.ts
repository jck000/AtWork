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
import { Geofence, TouchID, PinDialog, AndroidFingerprintAuth, Device } from 'ionic-native';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings = Settings;

  constructor(public navCtrl: NavController, public requestToApi: RequestToApi, public geofenceService: GeofenceService) {

  }

  post(){
    TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
      'Scan vingerafdruk / Voer code in!',
      'Code invoeren')
      .then(
        res => this.voerPostUit(),
        err => this.notAvailable()
      );
  }

  delete(){
    TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
      'Scan vingerafdruk / Voer code in!',
      'Code invoeren')
      .then(
        res => this.voerDeleteUit(),
        err => this.notAvailable()
      );
  }

  enter(){
    this.geofenceService.AddZones();
  }

  touchID(){
    var platform = Device.device.manufacturer;

    if (platform == "Apple"){
      TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
        'Scan vingerafdruk / Voer code in!',
        'Code invoeren')
        .then(
          res => alert("succes"),
          err => this.notAvailable()
        );
    }
    else{

      AndroidFingerprintAuth.isAvailable()
        .then((result)=> {
          if(result.isAvailable){
            // it is available

            AndroidFingerprintAuth.show({ clientId: "myAppName", clientSecret: "so_encrypted_much_secure_very_secret" })
              .then(result => {
                if(result.withFingerprint) {
                  console.log('Successfully authenticated with fingerprint!');
                } else if(result.withPassword) {
                  console.log('Successfully authenticated with backup password!');
                } else console.log('Didn\'t authenticate!');
              })


          } else {
            // fingerprint auth isn't available
          }
        })
    }
  }
  voerPostUit(){
    this.requestToApi.postRequest();
    alert("Post-request succesvol uitgevoerd!");
  }
  voerDeleteUit(){
    this.requestToApi.deleteRequest();
    alert("Delete-request succesvol uitgevoerd!");
  }
  notAvailable(){
    alert("Niet Beschikbaar!");

    //PinDialog werkt niet in Ionic 2, zit een bug in die niet opgelost wordt
    //PinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel']);

  }

}

