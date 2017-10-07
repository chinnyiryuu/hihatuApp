import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import { DatabaseProvider } from "../database/database";
import { Events } from "ionic-angular";
import { config } from "../config";

export const onSingIn = 'onSingIn';
export const onSingOut = 'onSingOut';

@Injectable()
export class AuthProvider {

  currentUser: firebase.User;

  constructor(
    public events: Events,
    private firebaseDB: DatabaseProvider
  ) {
    console.log('Hello AuthProvider Provider');
  }

  init() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.events.publish(onSingIn, user);
      } else {
        this.currentUser = null;
      }
    });
    this.firebaseDB.database = firebase.database();
  }

  signIn() {
    return new Promise((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(() => {
        firebase.auth().getRedirectResult().then((result) => {
          console.log(result);
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          resolve();
          this.events.publish(onSingIn, user);
        }).catch((error) => {
          reject();
          console.log(error);
          // Handle Errors here.
          // var errorCode = error.code;
          var errorMessage = error.message;
        });
      }).catch(() => {
        reject();
      });
    });
  }

  signOut() {
    return firebase.auth().signOut();
  }

  isSignIn() {
    return firebase.auth().currentUser != null;
  }

}
