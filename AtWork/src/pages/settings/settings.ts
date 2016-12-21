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

  //Inloggen op Facebook
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

  //Uitloggen op Facebook
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

  //Haal huidige inlogstatus op van Facebook
  facebookStatus(){
    Facebook.getLoginStatus().then(
      (status) => {
        console.log("current status: ", (status.status).toString());
        this.fbLogin = (status.status).toString();
      });
  }

  //Controleer Locatieservice
  toestelDiagnose(){
    let successCallback = (isAvailable) => { this.locationEnabled = "Locatieservice actief"; };
    let errorCallback = (e) => { this.locationEnabled = "Locatieservice niet actief"; };
    Diagnostic.isLocationEnabled().then(successCallback, errorCallback);
  }

  //Controleer netwerk
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

  ionViewDidLoad(){
    //this.geofenceService.AddZones();        //Geofence kan geactiveerd worden als bug eruit gehaald is
    this.facebookStatus();
  }

}

