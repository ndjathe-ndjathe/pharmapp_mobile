import {Component, ViewChild} from '@angular/core';
import {IonicPage, Nav, NavController, NavParams, AlertController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {Restangular} from "ngx-restangular";
import {Storage} from "@ionic/storage";
import {LoginPage} from "../login/login";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  @ViewChild('emailField') emailField: any;
  private email: string;
  private username: string;
  private phone: number;
  private password: string;
  private confirmation: string;
  private error: string;
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restangular: Restangular, public storage: Storage, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    setTimeout(() => {
      this.emailField.setFocus();
    }, 500);
  }

  passwordValidation (){
    let re;
    re = /[0-9]/;
    if(!re.test(this.password)) {
      return "Password must contain at least one number (0-9)!";
    }
    re = /[a-z]/;
    if(!re.test(this.password)) {
      return "Password must contain at least one lowercase letter (a-z)!";
    }
    re = /[A-Z]/;
    if(!re.test(this.password)) {
      return "Password must contain at least one uppercase letter (A-Z)!";
    }
    return "";
  }

  signup(){
    let re_num = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.email).toLowerCase())){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'The email you entered is not valid',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.username.length <= 5){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'The username must have at least 5 characters.',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(re_num.test(String(this.phone).toLowerCase())){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'The phone number is not valid',
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.passwordValidation() !== ""){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: this.passwordValidation(),
        buttons: ['OK']
      });
      alert.present();
    }
    else if(this.password !== this.confirmation){
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'The password and the confirmation must match',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.restangular.all('users').post({
        email: this.email,
        phone: this.phone,
        username: this.username,
        password: this.password,
      }).subscribe(user => {
        console.log('user login : ', user);
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Account successfully created',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(LoginPage);
      },error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: error.data.error.message,
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      });
    }
  }

  goToSignin(){
    console.log('inside go to signup');
    //this.rootPage = SignupPage;
    this.navCtrl.setRoot(LoginPage);
  }

}
