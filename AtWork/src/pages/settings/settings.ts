import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, Diagnostic, Toast, Device, Network, Vibration } from 'ionic-native';
/*
  Generated class for the Settings page.
  @Author: Niels Bekkers
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
  public fbLogin;
  //public status;

  constructor(public navCtrl: NavController) {

      this.ID = Device.device.uuid;
      this.Version = Device.device.version;
      this.Manufacturer = Device.device.manufacturer;
      this.toestelDiagnose();
      this.facebookStatus();
      this.networkConnection();
      Facebook.browserInit(185203801884323);
      this.fbLogin;
  }

  login() {
    Facebook.login(['public_profile']);
    this.facebookStatus();
  }

  logout(){
    Facebook.logout()
      .then(function(response) {
        Toast.show("Succesvol uitgelogd!", '2000', 'top').subscribe(
          toast => {
            console.log(toast);
          });
    }, function(error){
      console.log(error);
    });
    this.facebookStatus();
  }

  facebookStatus(){
    Facebook.getLoginStatus().then(
      (status) => {
        console.log("current status: ", (status.status).toString());
        this.fbLogin = (status.status).toString();
      });

  }

  toestelDiagnose(){
    let successCallback = (isAvailable) => { this.locationEnabled = "Locatieservice actief"; };
    let errorCallback = (e) => { this.locationEnabled = "Locatieservice niet actief"; };
    Diagnostic.isLocationEnabled().then(successCallback, errorCallback);
  }
  networkConnection(){
    // watch network for a disconnect
    //Vibration.vibrate(1000);
    Network.onDisconnect().subscribe(() => {
      Toast.show("Opgelet! Er is geen netwerk beschikbaar!", '5000', 'top').subscribe(
        toast => {
          console.log(toast);
        });
    });
  }

}

