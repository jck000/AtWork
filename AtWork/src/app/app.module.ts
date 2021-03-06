import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Settings } from '../pages/settings/settings';
import { RequestToApi } from '../providers/request-to-api';
import { GeofenceService } from '../providers/geofence-service';
import { LocationTracker } from '../providers/location-tracker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Settings
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Settings
  ],
  providers: [RequestToApi, GeofenceService, LocationTracker]
})
export class AppModule {}
