import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, Diagnostic, Toast, Device, Network, Vibration } from 'ionic-native';
import { GeofenceService } from '../../providers/geofence-service';
import { HomePage } from "../home/home";
/*
  Class for the Settings page.
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

  constructor(public navCtrl: NavController, public geofenceService: GeofenceService) {

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
    Facebook.login(['public_profile'])
      .then(function(response){
        console.log('Succesvol ingelogd!');
      }, function(error){
        console.log(error);
      });
    this.facebookStatus();
    this.navCtrl.push(HomePage);
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
      Toast.show("Opgelet! Er is een verandering van je netwerk gedetecteerd!", '5000', 'top').subscribe(
        toast => {
          console.log(toast);
        });
      Vibration.vibrate(1000);
    });
  }

  //Maak geofence aan op toestel van werknemer indien hij op instellingenpagina uitkomt
  ionViewDidLoad(){
    //this.geofenceService.AddZones();
    this.facebookStatus();
  }

}

