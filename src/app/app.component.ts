import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';
import { Auth, User } from '@ionic/cloud-angular'; 


@Component({
  templateUrl: 'app.html'
})
export class MyApp {      
  //rootPage;
 rootPage;

  constructor(platform: Platform) {
    if ( localStorage.getItem("token")==null || localStorage.getItem("token")=='0'){
         this.rootPage = LoginPage;
       } else {
         this.rootPage= TabsPage;
       }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
       
       
    /*     if(this.auth.isAuthenticated()) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }*/
      
    });
  }
}
