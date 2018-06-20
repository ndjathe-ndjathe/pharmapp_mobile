import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Restangular } from "ngx-restangular";

/**
 * Generated class for the PharmaciesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pharmacies',
  templateUrl: 'pharmacies.html',
})
export class PharmaciesPage {

  pharmacies: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restangular: Restangular) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PharmaciesPage');
    this.restangular.all('pharmacies').getList().subscribe(pharmacies => {
      console.log('success pharmacies : ', pharmacies);
    }, err => {
      console.log('err pharmacies : ', err);
    })
  }

}
