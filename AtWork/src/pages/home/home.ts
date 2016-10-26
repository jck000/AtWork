import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Settings } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  settings = Settings;

  constructor(public navCtrl: NavController) {

  }

}
