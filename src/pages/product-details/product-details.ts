import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {

  selectedItem: any;
  imgs: any;
  imgHead: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = this.navParams.get("item");
      if (this.selectedItem.images) {
          this.imgs = this.selectedItem.images;
      }
  }

  getKeys(items) {
    var obj: any
    if(items == null){
      obj = null;
    }else{
      obj = Object.keys(items);
    }
    return obj;
  }

}
