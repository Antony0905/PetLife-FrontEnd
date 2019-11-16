import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { IonicRatingModule } from 'ionic-rating';
import { AnuncioService } from 'src/services/anuncio.service';
import { AuthenticateService } from 'src/services/authenticate.service';
import { UsuarioService } from 'src/services/usuario.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalParameters } from './config/global-parameters';
import { ModfinalizarPage } from './modfinalizar/modfinalizar.page';
import { ModrelatarproblemaPage } from './modrelatarproblema/modrelatarproblema.page';
import { AgendaService } from './services/agenda.service';
import { CepService } from './services/cep.service';
import { PetService } from './services/pet-service.service';
import { UploadFileService } from './services/upload-file.service';
import { FormsModule } from '@angular/forms';
import { SuporteService } from 'src/services/suporte.service';




@NgModule({
  declarations: [AppComponent, ModfinalizarPage, ModrelatarproblemaPage],
  entryComponents: [ModfinalizarPage, ModrelatarproblemaPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    IonicRatingModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UsuarioService,
    SuporteService,
    AuthenticateService,
    AnuncioService,
    AgendaService,
    GlobalParameters,
    UploadFileService,
    InAppBrowser,
    CepService,
    PetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
