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
  public vergrendeling;
  public ontgrendelStatus;

  constructor(public navCtrl: NavController, public requestToApi: RequestToApi, public geofenceService: GeofenceService) {

    this.networkConnection();
    this.vergrendel();
  }

  post(){
    let ontgrendel = this.ontgrendelStatus;
    if(ontgrendel == true ){

      this.voerPostUit();
    }
    else{
      Toast.show("Gelieve eerst te ontgrendelen!", '3000', 'top').subscribe(
        toast => {
          console.log(toast);
        })
    }
  }

  delete(){
    let ontgrendel = this.ontgrendelStatus;
    if(ontgrendel == true){

      this.voerDeleteUit();
    }
    else{
      Toast.show("Gelieve eerst te ontgrendelen!", '3000', 'top').subscribe(
        toast => {
          console.log(toast);
        })
    }
  }

  touchID(){
    var platform = Device.device.manufacturer;

    if (platform == "Apple"){
      TouchID.verifyFingerprintWithCustomPasswordFallbackAndEnterPasswordLabel(
        'Scan vingerafdruk / Voer code in!',
        'Code invoeren')
        .then(
          res =>this.ontgrendel(),
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
                  this.ontgrendel();
                } else if(result.withPassword) {
                  this.ontgrendel();
                } else this.notAvailable();
              })
          } else {
            // Android fingerprint is niet beschikbaar
            Toast.show("Android fingerprint is niet beschikbaar!", '2000', 'top').subscribe(
              toast => {
                console.log(toast);
              });
            this.notAvailable();
          }
        })
    }
  }
  voerPostUit(){
    this.requestToApi.postRequest();
    Toast.show("Succesvol ingeschreven op de server!", '2000', 'top').subscribe(
      toast => {
        console.log(toast);
      });
    this.vergrendel();
  }
  voerDeleteUit(){
    this.requestToApi.deleteRequest();
    Toast.show("Succesvol uitgeschreven op de server", '2000', 'top').subscribe(
      toast => {
        console.log(toast);
      });
    this.vergrendel();
  }
  notAvailable(){
    Toast.show("Niet Beschikbaar!", '2000', 'top').subscribe(
      toast => {
        console.log(toast);
      });
    this.vergrendel();

    //PinDialog werkt niet in Ionic 2, zit een bug in die niet opgelost wordt!
    //PinDialog.prompt('Enter your PIN', 'Verify PIN', ['OK', 'Cancel']);
  }
  networkConnection(){
    // watch network for a disconnect
    //Vibration.vibrate(1000);
    Network.onDisconnect().subscribe(() => {
      Toast.show("Opgelet! Er is een verandering van je netwerk gedetecteerd!", '5000', 'top').subscribe(
        toast => {
          console.log(toast);
        });
    });
  }
  ontgrendel(){
    this.ontgrendelStatus = true;
    this.vergrendeling = "Ontgrendeld";
    Toast.show("Succesvol Ontgrendeld!", '3000', 'top').subscribe(
      toast => {
        console.log(toast);
      })
  }
  vergrendel(){
    this.ontgrendelStatus = false;
    this.vergrendeling = "Vergrendeld";
  }
}

