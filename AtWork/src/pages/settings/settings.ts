import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device } from 'ionic-native';
import { Facebook, Diagnostic } from 'ionic-native';
/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class Settings {

  public ID;
  public Version;
  public Manufacturer;
  public locationEnabled;

  constructor(public navCtrl: NavController) {

      this.ID = Device.device.uuid;
      this.Version = Device.device.version;
      this.Manufacturer = Device.device.manufacturer;
      this.toestelDiagnose();
  }

  login() {
    Facebook.browserInit(185203801884323);
    Facebook.login(['public_profile']);
  }

  logout(){
    Facebook.logout();
  }

  toestelDiagnose(){
    let successCallback = (isAvailable) => { this.locationEnabled = "Locatieservice actief"; };
    Diagnostic.isLocationEnabled().then(successCallback);

  }

}

