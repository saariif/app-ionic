import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { User, AuthCredential } from '@firebase/auth-types';
import { Reference } from '@firebase/database-types';

@Injectable()
export class ProfileProvider {
  // global variable
  public userProfile : Reference;
  public currentUser : User;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.currentUser=user;
        this.userProfile=firebase
        .database()
        .ref(`/userProfile/${user.uid}`);
      }

    });
  }

  // fungsi untuk mengambil user profile
getUserProfile(): Reference{
  return this.userProfile;
}

}


