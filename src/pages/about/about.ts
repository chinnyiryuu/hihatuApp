import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  user: string[];
  spinner1: boolean = true;
  params: any;
  constructor(public navCtrl: NavController, 
    public service: AppService, 
    public navParams: NavParams) {
    console.log(this.navParams.get('username'));
    var params ={
      username: this.navParams.get('username'),
      password: this.navParams.get('password')
    }
    this.getUser(params);
  }
  getUser(params) {
    this.service.httpPost(AppGlobal.API.getUser, params, rs =>{
       var bodys = new Array(rs.data);
       console.log(bodys);
       console.log(bodys[0]);
       this.user = bodys[0];
       this.spinner1 = false;
    })
  }
}
