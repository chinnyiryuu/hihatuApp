import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessegePage } from "./messege";

@NgModule({
  declarations: [MessegePage],
  imports: [IonicPageModule.forChild(MessegePage)],
})
export class MessegePageModule { }