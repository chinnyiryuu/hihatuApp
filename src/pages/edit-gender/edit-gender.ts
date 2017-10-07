import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { DatabaseProvider } from "../../providers/database/database";
import { Util } from "../util";

/**
 * Generated class for the EditGenderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-gender',
  templateUrl: 'edit-gender.html',
})
export class EditGenderPage {
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private auth: AuthProvider,
    private db: DatabaseProvider,
  ) {
    this.form = this.fb.group({
      gender: ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGenderPage');
    if (this.auth.isSignIn()) {
      let userId = this.auth.currentUser.uid;
      let path = 'settings/' + userId + '/gender';
      this.db.refOnce(path).then(snapshot => {
        this.form.setValue({ gender: snapshot.val() });
      });
    }
  }

  save() {
    if (this.auth.isSignIn()) {
      let loading = this.loadingCtrl.create({
        content: '保存中...'
      });
      loading.present();
      let userId = this.auth.currentUser.uid;
      let path = 'settings/' + userId + '/gender';
      let updates = {};
      let data = this.form.value;
      updates[path] = data.gender;
      this.db.update(updates).then(() => {
        loading.dismiss();
        let item = this.navParams.data;
        item.value = Util.parseGender(data.gender);
        this.navCtrl.pop();
      }).catch(() => {
        loading.dismiss();
      });
    }
  }

}
