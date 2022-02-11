import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { PreviewAnyFile } from '@ionic-native/preview-any-file/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';


import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 

import {AngularFireModule} from '@angular/fire/compat'
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,AngularFireStorageModule,AngularFireAuthModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },PreviewAnyFile,Downloader],
  bootstrap: [AppComponent],
})
export class AppModule {}
