import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PharmaciesPage } from '../pages/pharmacies/pharmacies';
import { ProductsPage } from '../pages/products/products';
import { ReservationsPage } from '../pages/reservations/reservations';
import { CardsPage } from '../pages/cards/cards';
import { ChatPage } from '../pages/chat/chat';
import { CommentsPage } from '../pages/comments/comments';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any, icon: string, badge: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home', badge: '' },
      { title: 'Pharmacies', component: PharmaciesPage, icon: 'medkit', badge: '100' },
      { title: 'Products', component: ProductsPage, icon: 'medical', badge: '5000' },
      { title: 'Reservations', component: ReservationsPage, icon: 'clipboard', badge: '2' },
      { title: 'Payment method', component: CardsPage, icon: 'card', badge: '1' },
      { title: 'Chat', component: ChatPage, icon: 'chatbubbles', badge: '0' },
      { title: 'Comments', component: CommentsPage, icon: 'send', badge: '0' },
    ];
    //this.storage.set('token', '');

    storage.get('token').then((val) => {
      console.log('Initial token value : ', val);
      if (val && val != '') {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });


  }

  ionViewWillLoad() {
    console.log('ionViewWillLoad HomePage');
    this.storage.get('token').then((val) => {
      console.log('Initial token value : ', val);
      if (val && val != '') {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
