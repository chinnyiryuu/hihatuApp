import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';

@Injectable()
export class DatabaseProvider {

  database: firebase.database.Database;

  constructor(
    // public http: Http
  ) {
    console.log('Hello DatabaseProvider Provider');
  }

  refOnce(path?: string) {
    return this.database.ref(path).once('value');
  }

  key(path?: string) {
    return this.database.ref().child(path).push().key;
  }

  update(updates) {
    return this.database.ref().update(updates);
  }



  private writeSettingData(settings) {
    if (!this.database) {
      return;
    }
    let userId = firebase.auth().currentUser.uid;
    this.database.ref('settings/' + userId).set(settings);
  }

  private updateSettingData(settings) {
    if (!this.database) {
      return;
    }
    let updates = {};
    let userId = firebase.auth().currentUser.uid;
    updates['settings/' + userId] = settings;
    this.database.ref().update(updates);
  }

}
