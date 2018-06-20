import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams} from 'ionic-angular';
import { Restangular } from "ngx-restangular";
import { Storage } from "@ionic/storage";
import {HomePage} from "../home/home";
import {SignupPage} from "../signup/signup";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restangular: Restangular, public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.storage.get('token').then((val) => {
      console.log('Initial token value : ', val, typeof val);
      if (!val || val == '') {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = HomePage;
      }

    });
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  login(){
    if (this.username.indexOf("@") >= 0) {
      this.restangular.all('users/login').post({
        email: this.username,
        password: this.password,
        ttl: 5
      }).subscribe(user => {
        console.log('user login : ', user);
        this.storage.set('token', user.id);
        this.storage.set('id', user.userId);
        this.navCtrl.setRoot(HomePage);
      });
    }
    else{
      this.restangular.all('users/login').post({
        username: this.username,
        password: this.password,
        ttl: 5
      }).subscribe(user => {
        console.log('user login : ', user);
        this.storage.set('token', user.id);
        this.storage.set('id', user.userId);
        this.storage.forEach((value, key) => {
          console.log('key : ', key);
          console.log('value : ', value);
        });
        this.navCtrl.setRoot(HomePage);
      });
    }

  }

  goToSignup(){
    console.log('inside go to signup');
    //this.rootPage = SignupPage;
    this.navCtrl.setRoot(SignupPage);
  }

}
