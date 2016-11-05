import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Device } from 'ionic-native';
import { Facebook } from 'ionic-native';
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
  public Serial;
  public Version;
  public Manufacturer;

  constructor(public navCtrl: NavController) {

      this.ID = Device.device.uuid;
      this.Serial = Device.device.serial;
      this.Version = Device.device.version;
      this.Manufacturer = Device.device.manufacturer;
  }

  login() {
    Facebook.browserInit(185203801884323);
    Facebook.login(['public_profile']);
  }
  logout(){
    Facebook.logout();
  }

}

