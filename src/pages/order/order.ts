import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { DatabaseProvider } from "../../providers/database/database";

/**
 * Generated class for the OrderPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orders = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private auth: AuthProvider,
    private db: DatabaseProvider,
  ) {
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: '请登录！',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.parent.select(3);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ionViewWillEnter');
    if (this.auth.isSignIn()) {
      this.initData();
    } else {
      this.showAlert();
      // setTimeout(() => {
      //   this.navCtrl.parent.select(3);
      // }, 0);
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewDidLoad ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLoad ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('ionViewDidLoad ionViewWillUnload');
  }

  ionViewCanEnter() {
    console.log('ionViewDidLoad ionViewCanEnter');
  }

  ionViewCanLeave() {
    console.log('ionViewDidLoad ionViewCanLeave');
  }

  initData() {
    if (this.auth.isSignIn()) {
      let userId = this.auth.currentUser.uid;
      this.db.database.ref('orders/').once('value').then(snapshot => {
        let data = snapshot.val() || {};
        this.orders = Object.keys(data).map(key => {
          return data[key];
        });
      });
    } else {
    }
  }
  itemSelected() {
    this.navCtrl.push('AboutPage');
  }

  add() {
    // 创建店铺
    let orderData = {
      name: 'test',
      menu: [
        {
          name: 'aaaaa'
        },
        {
          name: 'bbbb'
        }
      ],
    };

    // 取得店铺主键
    let newOrderKey = this.db.key('orders');

    let updates = {};
    updates['orders/' + newOrderKey] = orderData;

    this.db.update(updates).then(() => {
      this.initData();
    });
  }
}
