import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { DatabaseProvider } from "../../providers/database/database";
import { Util } from "../util";

/**
 * Generated class for the EditBirthdayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-birthday',
  templateUrl: 'edit-birthday.html',
})
export class EditBirthdayPage {
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
      birthday: ''
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditBirthdayPage');
    if (this.auth.isSignIn()) {
      let userId = this.auth.currentUser.uid;
      let path = 'settings/' + userId + '/birthday';
      this.db.refOnce(path).then(snapshot => {
        this.form.setValue({ birthday: snapshot.val() });
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
      let path = 'settings/' + userId + '/birthday';
      let updates = {};
      let data = this.form.value;
      updates[path] = data.birthday;
      this.db.update(updates).then(() => {
        loading.dismiss();
        let item = this.navParams.data;
        item.value = Util.formatDate(data.birthday);
        this.navCtrl.pop();
      }).catch(() => {
        loading.dismiss();
      });
    }
  }

}
