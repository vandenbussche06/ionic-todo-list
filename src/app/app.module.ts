import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const firebaseConfig = { 
  apiKey: "AIzaSyBlH3D78iYIMS4iQM9oK5pkKLweR8AYok8", 
  authDomain: "ionic-03-e058d.firebaseapp.com", 
  projectId: "ionic-03-e058d",
  storageBucket: "ionic-03-e058d.appspot.com", 
  messagingSenderId: "869233592769", 
  appId: "1:869233592769:web:e1c32e1a09c06b24114740" 
}; 

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
