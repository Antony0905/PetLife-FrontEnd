import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthenticateService } from 'src/services/authenticate.service';
import { AnuncioService } from 'src/services/anuncio.service';
import { IonicStorageModule } from '@ionic/storage';
import { GlobalParameters } from './config/global-parameters';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { UploadFileService } from './services/upload-file.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

const firebaseConfig = {
  apiKey: 'AIzaSyCijbdvk9LitPTtDAlc1G90WH9kB-nl_zw',
  authDomain: 'petlife-87bf0.firebaseapp.com',
  databaseURL: 'https://petlife-87bf0.firebaseio.com',
  projectId: 'petlife-87bf0',
  storageBucket: 'petlife-87bf0.appspot.com',
  messagingSenderId: '110571944669',
  appId: '1:110571944669:web:16b07bf785ac759172f934'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsuarioService,
    AuthenticateService,
    AnuncioService,
    GlobalParameters,
    UploadFileService,
    InAppBrowser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
