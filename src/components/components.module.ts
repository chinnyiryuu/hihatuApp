import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { IonStoresComponent } from './ion-stores/ion-stores';
import { IonProductsComponent } from './ion-products/ion-products';
@NgModule({
	declarations: [IonStoresComponent,
    IonProductsComponent],
	imports: [IonicModule],
	exports: [IonStoresComponent,
    IonProductsComponent]
})
export class ComponentsModule {}
