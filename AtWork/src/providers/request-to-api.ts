import { Injectable, NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';
import {Http} from '@angular/http';

@Injectable()
export class RequestToApi {

  constructor(public zone: NgZone, public http : Http) {

  }

  postRequest(){
    let url = 'http://192.168.0.141/api.php/werknemers';

    var data = JSON.stringify({deviceID: "2013", datum: "2016-10-31", tijd: "16:03:53"});

    this.http.post(url, data)
      .subscribe(data =>

        console.log("succes")

      );
  }

  deleteRequest(){
    let url = 'http://192.168.0.141/api.php/werknemers';

    this.http.delete(url, 2013)
      .subscribe(data =>

        console.log("succes")

      );
  }

}
