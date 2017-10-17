import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { CameraPage } from '../camera/camera';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = CameraPage;
  //tab5Root: any = LoginPage;

  constructor(private app: App) {
  /* if (localStorage.getItem("token")=='0') 
     this.app.getRootNav().setRoot(LoginPage);
   else
     this.app.getRootNav().setRoot(CameraPage);
*/
  }
}
