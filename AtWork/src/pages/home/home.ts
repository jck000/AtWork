import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Settings } from '../settings/settings';
import { RequestToApi } from '../../providers/request-to-api';
import { GeofenceService } from '../../providers/geofence-service';
import { Geofence, TouchID, Toast, AndroidFingerprintAuth, Device, Network, Vibration } from 'ionic-native';

/*
 Generated class for the Home page.
 @Author: Niels Bekkers
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings = Settings;

  constructor(public navCtrl: NavController, public requestToApi: RequestToApi, public geofenceService: GeofenceService) {

    this.networkConnection();
  }

  post(){
    var platform = Device.device.manufacturer;

    if (platform == "Apple"){
      TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
        'Scan vingerafdruk / Voer code in!',
        'Code invoeren')
        .then(
          res => this.voerPostUit(),
          err => this.notAvailable()
        );
    }
    else{
      AndroidFingerprintAuth.isAvailable()
        .then((result)=> {
          if(result.isAvailable){
            // it is available

            AndroidFingerprintAuth.show({ clientId: "AtWork", clientSecret: "so_encrypted_much_secure_very_secret" })
              .then(result => {
                if(result.withFingerprint) {
                  console.log('Successfully authenticated with fingerprint!');
                  this.voerPostUit();
                } else if(result.withPassword) {
                  console.log('Successfully authenticated with backup password!');
                  this.voerPostUit();
                } else console.log('Didn\'t authenticate!');
              })
          } else {
            // Android fingerprint is niet beschikbaar
            this.notAvailable();
          }
        })
    }
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
            // Android fingerprint is niet beschikbaar
          }
        })
    }
  }
  voerPostUit(){
    this.requestToApi.postRequest();
    Toast.show("Post-request succesvol uitgevoerd!", '2000', 'top').subscribe(
      toast => {
        console.log(toast);
      });
  }
  voerDeleteUit(){
    this.requestToApi.deleteRequest();
    Toast.show("Delete-request succesvol uitgevoerd!", '2000', 'top').subscribe(
      toast => {
        console.log(toast);
      });
  }
  notAvailable(){
    Toast.show("Niet Beschikbaar!", '2000', 'top').subscribe(
      toast => {
        console.log(toast);
      });

    //PinDialog werkt niet in Ionic 2, zit een bug in die niet opgelost wordt!
    //PinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel']);
  }

  networkConnection(){
    // watch network for a disconnect
    //Vibration.vibrate(1000);
    Network.onDisconnect().subscribe(() => {
      Toast.show("Opgelet! Er is geen netwerk beschikbaar! Voor de werking van deze applicatie heb je een netwerk nodig!", '5000', 'top').subscribe(
        toast => {
          console.log(toast);
        });
    });
  }

}

