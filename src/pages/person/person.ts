import { Component } from '@angular/core';
import { NavController, IonicPage, ActionSheetController, Events } from 'ionic-angular';

import { AuthProvider, onSingIn } from "../../providers/auth/auth";
import { DatabaseProvider } from "../../providers/database/database";
import { Util } from "../util";

@IonicPage()
@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {
  items: PersonItem[] = [];

  constructor(
    public navCtrl: NavController,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    private auth: AuthProvider,
    private db: DatabaseProvider,
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonPage');
  }
  
  ionViewWillEnter() {
    this.initData();
    this.events.subscribe(onSingIn, (user) => {
      this.initData();
    })
  }

  initData() {
    if (this.auth.isSignIn()) {
      let userId = this.auth.currentUser.uid;
      this.db.database.ref('settings/' + userId).once('value').then(snapshot => {
        let data = snapshot.val();
        this.setItem(data);
      });
    } else {
      this.setItem();
    }
  }

  setItem(data?) {
    let gender = new PersonItem("性别");
    gender.editor = 'EditGenderPage';
    data && (gender.value = Util.parseGender(data.gender));
    let birthday = new PersonItem("生日");
    birthday.editor = 'EditBirthdayPage';
    data && (birthday.value = Util.formatDate(data.birthday));
    let personalInfo = new PersonItem("更多个人资料");
    let phone = new PersonItem("手机");
    let mail = new PersonItem("邮箱");
    let thirdPartyAccount = new PersonItem("第三方账号关联");
    let settings = new PersonItem("设置");
    let nickname = new PersonItem("昵称");
    let phoneBinding = new PersonItem("手机绑定");
    let age = new PersonItem("年龄");
    let tastePreferences = new PersonItem("口味偏好");
    this.items = [];
    if (this.auth.isSignIn()) {
      this.items.push(gender);
      this.items.push(birthday);
      this.items.push(personalInfo);
      this.items.push(phone);
      this.items.push(mail);
      this.items.push(thirdPartyAccount);
      this.items.push(settings);
    } else {
      this.items.push(thirdPartyAccount);
      this.items.push(nickname);
      this.items.push(phoneBinding);
      this.items.push(gender);
      this.items.push(age);
      this.items.push(tastePreferences);
    }
  }

  itemSelected(item: PersonItem) {
    if (item && item.editor) {
      this.navCtrl.push(item.editor, item);
    } else {
      this.navCtrl.push('AboutPage');
    }
  }

  showLogin() {
    this.navCtrl.push('LoginPage');
  }

  isSignIn() {
    return this.auth.isSignIn();
  }

  signOut() {
    return this.auth.signOut();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Modify your album',
      buttons: [
        {
          text: '退出登录',
          role: 'destructive',
          handler: () => {
            this.signOut().then(() => {
              this.setItem();
            });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

}

class PersonItem {
  value: any;
  editor: string;
  constructor(public name: string) { }
}
