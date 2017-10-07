import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StoresPage } from './stores'

@NgModule({
  declarations: [StoresPage],
  imports: [IonicPageModule.forChild(StoresPage),ComponentsModule],
})
export class StoresPageModule { }