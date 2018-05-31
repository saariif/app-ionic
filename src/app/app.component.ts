import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { firebaseConfig } from './credentials';
import { Unsubscribe } from "@firebase/util";

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
      //menginisialisasi firebase
      firebase.initializeApp(firebaseConfig);

      // cek user
      const unsubcribe : Unsubscribe =
      firebase.auth().onAuthStateChanged(user=>{
        if(!user){ //belum terauthentikasi
          this.rootPage = 'LoginPage'; // class belum import
          unsubcribe();
        }else{ //sudah terauthentikasi
          this.rootPage = HomePage; // class sudah terimport di atas
          unsubcribe();
        }
      })
/*
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  */
  }
}

