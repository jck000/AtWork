import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geofence } from 'ionic-native';
import { RequestToApi } from '../providers/request-to-api';

/*
  Generated class for the GeofenceService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GeofenceService {

  //*******************  Geofence staat ingesteld op thuisadres Niels Bekkers  *******************//
  public latitude = 51.055755;
  public longitude = 5.286769;
  public radius = 100;
  //**********************************************************************************************//

  constructor(public http: Http, public requestToApi: RequestToApi) {
    console.log('Hello GeofenceService Provider');
  }

  EnterZone(){
    Geofence.addOrUpdate({
      id:             1, //A unique identifier of geofence
      latitude:       this.latitude, //Geo latitude of geofence
      longitude:      this.longitude, //Geo longitude of geofence
      radius:         this.radius, //Radius of geofence in meters
      transitionType: Geofence.TransitionType.BOTH, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
      notification: {         //Notification object
        id:             1, //optional should be integer, id of notification
        title:          "Welkom op het bedrijf", //Title of notification
        text:           "Je bent succesvol ingetikt, u kan beginnen aan de werkpost!", //Text of notification
        smallIcon:      String, //Small icon showed in notification area, only res URI
        icon:           String, //icon showed in notification drawer
        openAppOnClick: true,//is main app activity should be opened after clicking on notification
        data:           Object  //Custom object associated with notification
      }
    }).then(function () {
      console.log('Geofence successfully added');
    }, function (reason) {
      console.log('Adding geofence failed', reason);
    });

    /*if (Geofence.TransitionType.ENTER == 1){
      this.requestToApi.postRequest();
    }*/

  }

  LeaveZone(){
    Geofence.addOrUpdate({
      id:             2, //A unique identifier of geofence
      latitude:       this.latitude, //Geo latitude of geofence
      longitude:      this.longitude, //Geo longitude of geofence
      radius:         this.radius, //Radius of geofence in meters
      transitionType: 2, //Type of transition 1 - Enter, 2 - Exit, 3 - Both
      notification: {         //Notification object
        id:             2, //optional should be integer, id of notification
        title:          "U verlaat het bedrijf", //Title of notification
        text:           "Je bent succesvol uitgetikt, Tot de volgende keer!", //Text of notification
        smallIcon:      String, //Small icon showed in notification area, only res URI
        icon:           String, //icon showed in notification drawer
        openAppOnClick: Boolean,//is main app activity should be opened after clicking on notification
        data:           Object  //Custom object associated with notification
      }
    }).then(function () {
      console.log('Geofence successfully added');
    }, function (reason) {
      console.log('Adding geofence failed', reason);
    });
  }

}
