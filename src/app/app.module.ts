import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AppService } from './app.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { RestProvider } from '../providers/rest/rest';
import { HttpModule } from '@angular/http';
import {PropertyService} from "../providers/data/homelist-service";
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    AppService,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DatabaseProvider,
    RestProvider,
    PropertyService,
    IonicStorageModule,
  ]
})
export class AppModule { }
