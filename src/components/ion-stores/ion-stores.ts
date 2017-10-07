import { NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
@Component({
  selector: 'ion-stores',
  templateUrl: 'ion-stores.html'
})
export class IonStoresComponent {
  @Input() stores: Array<any>;
  constructor(public navCtrl: NavController) {
    console.log('Hello IonStores Component');
  }
  goDetails(item) {
    this.navCtrl.push('StorePage', { item: item });
  }
}
