import {Component, ViewChild} from '@angular/core';
import {NavController, ActionSheetController, Nav} from 'ionic-angular';
import { Restangular } from 'ngx-restangular';
import { Storage } from "@ionic/storage";
import { RestApiProvider } from "../../providers/rest-api/rest-api";

import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public restangular: Restangular, public storage: Storage, public api: RestApiProvider) {
    //this.storage.set('token', '');
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      cssClass: 'actionSheet',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Parameters',
          icon: 'settings',
          handler: () => {
            console.log('Settings clicked');
          }
        },{
          text: 'Logout',
          icon: 'exit',
          handler: () => {
            console.log('Logout clicked');
            console.log('provider : ', this.api.getToken(), typeof this.api.getToken());
            console.log('provider : ', this.api.call(), typeof this.api.call());
            //this.storage.set('token', '');
            //this.navCtrl.setRoot(LoginPage);
            this.api.call().then(restangular => {
              console.log('restangular : ', restangular);
              restangular.all('users/logout').post().subscribe(user => {
                console.log('user on disconnect : ', user);
                this.storage.set('token', '');
                this.storage.set('id', '');
                this.navCtrl.setRoot(LoginPage);
                console.log('After user disconnection');
              },
                error => {
                  console.log('Error : ', error);
                  this.storage.set('token', '');
                  this.storage.set('id', '');
                  this.navCtrl.setRoot(LoginPage);
                })
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
