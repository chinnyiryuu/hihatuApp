import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  countries: string[];
  errorMessage: string;
  language: string[];
  images:any;
  spinner1: boolean = true;

  params = {
    favoritesId: 2054400,
    pageNo: 1,
    pageSize: 20
  }
  constructor(public navCtrl: NavController, public service: AppService) {
    this.getImage();
  }
  getItems(ev) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.navCtrl.push('ShopPage', val);
    }
  }

  itemSelected() {
    this.navCtrl.push('MessegePage');
  }
  getImage() {
    var imageStr = new Array();
    this.service.httpGet(AppGlobal.API.getAdventImage, null, rs =>{
       var bodys = rs.data;
       var bodysCo = new Array(rs.data);
       for(var i=0;i<bodys.length;i++){
        var imgs = bodys[i].images;
        for(var j=0;j<imgs.length;j++){
          imageStr = imageStr.concat(imgs[j].src);
        }
       }
       this.images = imageStr;
       this.countries = bodysCo;
       this.spinner1 = false;
    })
  }
  
  gotoStor(){
    this.navCtrl.push('StorePage')
  }

  getKeys(items) {
    return Object.keys(items);
  }

}
