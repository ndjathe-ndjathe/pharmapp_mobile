import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PharmaciesPage } from '../pages/pharmacies/pharmacies';
import { ProductsPage } from '../pages/products/products';
import { ReservationsPage } from '../pages/reservations/reservations';
import { CardsPage } from '../pages/cards/cards';
import { ChatPage } from '../pages/chat/chat';
import { CommentsPage } from '../pages/comments/comments';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/api/api';
import { LoadingProvider } from '../providers/loading/loading';
import { RestangularModule } from 'ngx-restangular';
import {Observable} from "rxjs/Observable";
import {catchError} from "rxjs/operators";
import {SignupPage} from "../pages/signup/signup";
import { RestApiProvider } from '../providers/rest-api/rest-api';

// Function for settting the default restangular configuration
export function RestangularConfigFactory (RestangularProvider, storage, http) {
  RestangularProvider.setBaseUrl('http://localhost:3000/api/');

  /*storage.get('token').then((val) => {
    console.log('Token in config : ', val);
    RestangularProvider.setDefaultHeaders({'Authorization': val});
  });*/

  var updateURLParameter = function(url, param, paramVal){
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i=0; i<tempArray.length; i++){
        if(tempArray[i].split('=')[0] != param){
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  };

  // by each request to the server receive a token and update headers with it
  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    /*console.log('*********** In the interceptor **************');
    storage.get('token').then((val) => {
      console.log('Token in config : ', val, params);
      return {
        url: updateURLParameter(url, 'access_token', val)
      };
    });
    console.log('*********** End In the interceptor **************');*/
  });

  RestangularProvider.addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status === 401) {

      //On n'active pas l'intercepteur pour les requêtes de logout
      if(!response.request.url.includes('logout')){
        // This function must return observable
        let refreshAccesstoken = function () {
          // Here you can make action before repeated request
          return storage.get('token').then((token) => {
            console.log('Token in refresh token : ', token);
            return storage.get('id').then((id) => {
              console.log('Id in refresh token : ', id);
              return http.get('http://localhost:3000/api/accessTokens/refresh/' + token + '?userId=' + id + '&duration=5');
            });
          });
        };

        refreshAccesstoken().then(data => {
          data.subscribe(res => {
            console.log('response : ', res);
            console.log('response query : ', response);
            storage.set('token', res.token.id);
            console.log('previous url : ', response.request.url);
            response.request.url = updateURLParameter(response.request.url, 'access_token', res.token.id);
            console.log('next url : ', response.request.url);
            response.repeatRequest(response.request).subscribe(
              res => responseHandler(res),
              err => subject.error(err)
            );
          }, err => {
            console.log('err : ', err);
            console.log('response query : ', response);
          });
        });

        return false; // error handled

      }
      else {
        return true; // error not handled
      }
    }
    return true; // error not handled
  });
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    PharmaciesPage,
    ProductsPage,
    ReservationsPage,
    CardsPage,
    ChatPage,
    CommentsPage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    RestangularModule.forRoot([ Storage, HttpClient ], RestangularConfigFactory)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    PharmaciesPage,
    ProductsPage,
    ReservationsPage,
    CardsPage,
    ChatPage,
    CommentsPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    LoadingProvider,
    RestApiProvider,
  ]
})
export class AppModule {}
