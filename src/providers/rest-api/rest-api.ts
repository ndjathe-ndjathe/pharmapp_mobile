import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restangular } from "ngx-restangular";
import { Storage } from "@ionic/storage";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestApiProvider {

  constructor(public http: HttpClient, public restangular: Restangular, public storage: Storage) {
    console.log('Hello RestApiProvider Provider');
  }

  async getToken(){
    return await this.storage.get('token');
  }

  call(){
    return this.storage.get('token').then(token => {
      // the value that will be returned
      return this.restangular.withConfig((RestangularConfigurer) => {
        console.log('Configuration done ! ');
        RestangularConfigurer.setDefaultRequestParams({access_token: token});
        /*RestangularConfigurer.setDefaultHeaders({
          'Authorization': token,
          'X-Access-Token': token
        });*/
      });
    }, err => {
      // throw some error
    })
  }



}
