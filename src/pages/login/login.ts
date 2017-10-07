import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AppService, AppGlobal } from '../../app/app.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: string[];
  spinner1: boolean = true;
  params: any;

  constructor(
    public navCtrl: NavController, public service: AppService
  ) {

  }
  logIn(username: HTMLInputElement, password: HTMLInputElement) {
    if (username.value.length == 0) {
      alert("请输入账号");
    } else if (password.value.length == 0) {
      alert("请输入密码");
    } else {
      let userinfo: string = '用户名：' + username.value + '密码：' + password.value;
      alert(userinfo);
      this.params = {
        username: username.value,
        password: password.value,
      }
      this.goDetails(username.value, password.value);
      //this.getUser(this.params);
    }
  }
  // getUser(params) {
  //   this.service.postSerialization( params, rs =>{
  //      var bodys = new Array(rs.data);
  //      console.log(bodys);
  //      console.log(bodys[0]);
  //      this.user = bodys[0];
  //      this.spinner1 = false;
  //   })
  // }

  goDetails(username,password) {
    this.navCtrl.push('AboutPage', { username: username, password: password });
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}
