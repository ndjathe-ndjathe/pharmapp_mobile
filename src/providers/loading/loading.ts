import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular'

/*
  Generated class for the LoadingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingProvider {

  private loading:any;

  constructor(public loadingCtrl: LoadingController) {
    console.log('Hello LoadingProvider Provider');
  }

  show() {
    if(!this.loading){
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true
      });
    }
    this.loading.present();
  }
  hide() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

}
