import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StorePage } from './store';
import { ComponentsModule } from './../../components/components.module';

@NgModule({
  declarations: [
    StorePage,
  ],
  imports: [
    IonicPageModule.forChild(StorePage),ComponentsModule
  ],
})
export class StorePageModule {}
