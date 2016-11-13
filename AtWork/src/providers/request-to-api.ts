import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';
import {Http} from '@angular/http';
import { Device } from 'ionic-native';

/*
 Generated class for the RequestToApi provider.
 @Author: Niels Bekkers
 */

@Injectable()
export class RequestToApi {


  constructor(public zone: NgZone, public http : Http) {

  }

  postRequest(){

    var ID = Device.device.uuid;

    var dateobj = new Date();
    function pad(n) {return n < 10 ? "0"+n : n;}
    var resultDatum = dateobj.getFullYear()+"-"+pad(dateobj.getMonth()+1)+"-"+pad(dateobj.getDate());

    var berekenUren = new Date().getHours();
    var berekenMinuten = new Date().getMinutes();
    var berekenSeconden = new Date().getSeconds();
    var totaleTijd = berekenUren+":"+berekenMinuten+":"+berekenSeconden;

    let url = 'http://192.168.0.141/api.php/werknemers';

    var data = JSON.stringify({deviceID: ID, datum: resultDatum, tijd: totaleTijd});

    this.http.post(url, data)
      .subscribe(data =>

        console.log("Post Request succesvol uitgevoerd")

      );
  }

  deleteRequest(){

    var ID = Device.device.uuid;

    let url = 'http://192.168.0.141/api.php/werknemers/' + ID;

    this.http.delete(url)
      .subscribe(res =>

        console.log("Delete Request succesvol uitgevoerd")

      );
  }

}
