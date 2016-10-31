import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
//import { Headers } from '@angular/http';
import { HTTP } from 'ionic-native';
//import { Device } from 'ionic-native';
//import { TouchID } from 'ionic-native';
//import { BatteryStatus } from 'ionic-native';
import { Settings } from '../settings/settings';
import { RequestToApi } from '../../providers/request-to-api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings = Settings;

  constructor(public navCtrl: NavController, public requestToApi: RequestToApi) {

  }

  post(){
    this.requestToApi.postRequest();
  }

  delete(){
    this.requestToApi.deleteRequest();
  }

}
