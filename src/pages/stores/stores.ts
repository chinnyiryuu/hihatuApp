import { Component } from '@angular/core';
import { AppService, AppGlobal } from './../../app/app.service';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-stores',
  templateUrl: 'stores.html'
})
export class StoresPage {

  hasmore = true;
  spinner1: boolean = true;
  stores: Array<any> = [];

  params = {
    pageNo: 1,
    favoritesId: 0,
  }
  constructor(
    public navCtrl: NavController,
    public appService: AppService
  ) {
    this.getStores();
  }
  getStores() {
     this.appService.httpGet(AppGlobal.API.getStores, this.params, rs => {
      console.debug(rs);
      this.stores = rs.data;
    })
  }

  itemSelected() {
    this.navCtrl.push('AboutPage');
  }

  showDetails(store) {
    this.navCtrl.push('StorePage', store);
  }

}
