import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';
import {Http} from '@angular/http';
import { Device } from 'ionic-native';

@Injectable()
export class RequestToApi {


  constructor(public zone: NgZone, public http : Http) {

  }

  postRequest(){

    var ID = Device.device.uuid;

    let url = 'http://192.168.0.141/api.php/werknemers';

    var data = JSON.stringify({deviceID: ID, datum: "2016-10-31", tijd: "16:03:53"});

    this.http.post(url, data)
      .subscribe(data =>

        console.log("Post Request succesvol uitgevoerd")

      );
  }

  deleteRequest(){
    /*let headers= new Headers();
    headers.append("Content-Type", "text/html");
    let options= new RequestOptions({headers:headers});*/

    var ID = Device.device.uuid;

    let url = 'http://192.168.0.141/api.php/werknemers/' + ID;

    this.http.delete(url)
      .subscribe(res =>

        console.log("Delete Request succesvol uitgevoerd")

      );
  }

}
